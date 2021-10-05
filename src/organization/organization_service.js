const organizationDataProvider = require('./organization_dataprovider')

let OrganizationService = {
  getOrganizations: async dbKey => {
    let organizations = await organizationDataProvider.getOrganizations(dbKey)
    return organizations
  }
}

module.exports = OrganizationService
