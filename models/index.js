'use strict';
const DBConnector = require('../src/utils/dbConnector');

let dbRepo = {};

DBConnector.addSequelizeConnectionToRepo(dbRepo, 'default');


module.exports = dbRepo;
