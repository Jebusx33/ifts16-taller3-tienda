'use strict'
var express = require('express');
var cuponController = require('../controllers/cuponController');

var api = express.Router();
var auth = require('../middleware/authenticate');


module.exports = api;