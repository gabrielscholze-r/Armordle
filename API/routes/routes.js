const express = require('express');
const routes = express.Router();

const DataController = require('../controller/DataController');
routes.get('/data/sorted', DataController.sort)
routes.get('/data/stats', DataController.getStatsById)
// routes.get('/data/id', DataController.getRID)


module.exports = routes;