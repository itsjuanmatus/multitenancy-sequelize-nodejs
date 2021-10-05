const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const modelsDir = path.resolve(__dirname + '/../../models')

let DBConnector = {
  addSequelizeConnectionToRepo: (dbRepo, dbKey) => {
    const db = {}

    let sequelize
    if (dbKey === 'default') {
      sequelize = new Sequelize('common_db', 'root', '12345678', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: 0,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 1000000
        }
      })
    } else {
      sequelize = new Sequelize(dbKey, 'root', '12345678', {
        host: 'localhost',
        dialect: 'mysql',
        operatorsAliases: 0,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 1000000
        }
      })
    }

    fs.readdirSync(modelsDir)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== 'index.js' &&
          file.slice(-3) === '.js'
        )
      })
      .forEach(file => {
        const model = require(path.join(modelsDir, file))(
          sequelize,
          Sequelize.DataTypes
        )

        db[model.name] = model
      })

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    })

    db.sequelize = sequelize
    db.Sequelize = Sequelize

    db.sequelize
      .sync()
      .then(() => {
        console.log('Drop and re-sync db.')
      })
      .catch(err => {
        console.log('el sync: ' + err)
      })

    dbRepo[dbKey] = db

    return dbRepo
  }
}

module.exports = DBConnector
