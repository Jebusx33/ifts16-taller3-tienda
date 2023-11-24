'use strict'

var express = require('express');
var ventaController = require('../controllers/ventaController');

var api = express.Router();
var auth = require('../middleware/authenticate');

api.post('/registro_compra_cliente',auth.auth,ventaController.registro_compra_cliente);
//api.get('/enviar_correo_compra_cliente/:id',auth.auth,ventaController.enviar_correo_compra_cliente);

module.exports = api;