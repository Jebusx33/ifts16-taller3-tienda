'use strict'
var express = require('express');
var adminController = requiere('../controller/AdminController');

var api = express.Router();

api.post('/registro_admin', adminController,registro_admin);
module.exports = api;