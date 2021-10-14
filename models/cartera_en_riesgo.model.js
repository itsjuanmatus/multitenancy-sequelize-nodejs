var moment = require('moment')

module.exports = (sequelize, Sequelize) => {
  const CarteraEnRiesgo = sequelize.define(
    'carteras',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FEC_CIERRE: {
        type: Sequelize.DATE
      },
      SEC_CREDITO: {
        type: Sequelize.DOUBLE
      },
      MON_SALDO: {
        type: Sequelize.DOUBLE
      },
      moneda: {
        type: Sequelize.STRING
      },
      VAL_TIPO_CAMBIO_CONV: {
        type: Sequelize.DOUBLE
      },
      ID_ESTADO: {
        type: Sequelize.STRING
      },
      CANT_TOTAL: {
        type: Sequelize.DOUBLE
      },
      clasificacion: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  )
  return CarteraEnRiesgo
}
