const express = require('express')
const router = express.Router()
const organizationController = require('../src/organization/organization_controller')

router.get('/', function (request, response, next) {
  organizationController.getOrganizations(request, response, next)
})

module.exports = router
