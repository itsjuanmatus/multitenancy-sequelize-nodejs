const path = require('path')

const dbRepo = require('../../models')
const Account = dbRepo['default'].Account

let SignupDataProvider = {
  getAccount: async accountId => {
    return new Promise(function (resolve, reject) {
      Account.findOne({ where: { id: accountId } })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

module.exports = SignupDataProvider