const organizationService = require('./organization_service')
const common = require('../utils/common')
const responder = require('../utils/responder')

let OrganizationController = {
  getOrganizations: async (request, response, next) => {
    try {
      let dbKey = await common.getDBKeyFromRequest(request)
      let organizations = await organizationService.getOrganizations(dbKey)
      responder.sendResponse(
        response,
        200,
        'success',
        organizations,
        'Organizations retrieved successfully.'
      )
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = OrganizationController
