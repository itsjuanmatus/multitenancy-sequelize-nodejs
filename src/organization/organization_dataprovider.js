const dbRepo = require('../../models')

let OrganizationDataProvider = {
  getOrganizations: async dbKey => {
    const organization = dbRepo[dbKey].Organization

    return new Promise(function (resolve, reject) {
      organization.findAll()
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
module.exports = OrganizationDataProvider
