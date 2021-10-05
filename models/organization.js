'use strict'
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },{})
  return Organization
}
