const common = require('../utils/common')
let os = require('os')
const fs = require('fs')
const csv = require('csv')
const async = require('async')

const dbRepo = require('../../models')

const uploadExcel = async (req, res) => {
  
  let dbKey = await common.getDBKeyFromRequest(req)
  const CarteraEnRiesgo = await dbRepo[dbKey].carteras

  try {
    if (!req.file) {
      return res.status(400).send('Please upload a csv file!')
    }
    let path = `routes/${req.file.filename}`
    var input = fs.createReadStream(path)
    var parser = csv.parse({
      columns: true,
      relax: true
    })
    var inserter = async.cargo(function (tasks, inserterCallback) {
      CarteraEnRiesgo.bulkCreate(tasks).then(function () {
        inserterCallback()
      })
    }, 1000)

    parser.on('readable', function () {
      while ((line = parser.read())) {
        inserter.push(line)
      }
    })
    parser.on('end', function (count) {
      inserter.drain = function () {
        doneLoadingCallback()
      }
    })

    input.pipe(parser)
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Error, no se pudo subir el archivo: ${req.file.originalname}`
    })
  } finally {
    return res.status(200).send({
      message: 'Se subió el archivo correctamente: ' + req.file.originalname
    })
  }
}

module.exports = {
  uploadExcel
}
