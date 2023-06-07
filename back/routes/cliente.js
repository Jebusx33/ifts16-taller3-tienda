'use strict'
var express = require('express');
//const { registro_cliente } = require('../controllers/clienteController');
var clienteController = require('../controllers/ClienteController')

var api = express.Router();
var auth = require('../middleware/authenticate');

api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);
//api.get('/listar_clientes_filtro_admin', clienteController.listar_clientes_filtro_admin);
api.get('/listar_clientes_filtro_admin/:tipo/:filtro?', auth.auth, clienteController.listar_clientes_filtro_admin);
api.post('/registro_cliente_admin', auth.auth, clienteController.registro_cliente_admin);
module.exports = api;