const dbRepo = require('../../models')
const dbConnector = require('../../src/utils/dbConnector')
const signupDataProvider = require('../signup/signup_dataprovider')


let Common = {
  getDBKeyFromRequest: async request => {
    let tenant_id = request.headers['x-tenant-id']
    let dbKey = 'default'
    if (tenant_id) {
      dbKey = tenant_id
      dbConnector.addSequelizeConnectionToRepo(dbRepo, dbKey)
    }

    
    return dbKey
  }
}

module.exports = Common
