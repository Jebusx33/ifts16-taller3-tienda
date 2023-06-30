'use strict'
var express = require('express');
var configController = require('../controllers/ConfigController')

var api = express.Router();
var auth = require('../middleware/authenticate');

api.get('/actualiza_config_admin/', auth.auth, configController.actualiza_config_admin);

module.exports = api;