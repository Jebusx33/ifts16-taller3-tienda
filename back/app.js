'use strict'
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.Port || 4201;
<<<<<<< HEAD
const cors = require('cors');
const whiteList = ['http://localhost:4200', 'http://localhost:4201'];
=======
const cors = require('cors')
const whiteList = ['http://localhost:4200', 'http://localhost:4201']
>>>>>>> 3dee132c888086f5fce2ae5fe5b9e2ed498562a2
var admin_route = require('./routes/admin');
var cliente_route = require('./routes/cliente');
var cupon_route = require('./routes/cupon');

app.use(cors({ origin: whiteList }));

mongoose.set('strictQuery', false); // Colocar aquí

mongoose.connect('mongodb+srv://testTienda:JA4X37KWL2gO6WQn@tienda.xthlu27.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log(err);
    } else {

        app.listen(port, function () {
            console.log("\n**** servidor corriendo en ==> http://localhost:" + port + " ****** \n");
        });
    }
});

app.use(bodyparser.json({ limt: '50mb', extended: true }));

app.use((req, res, next) => {
<<<<<<< HEAD
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
=======
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Heather', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Acces-Control-Allow-Request-Method');
    res.header('Acces-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('allow', 'GET, PUT, POST, DELETE, OPTION');
>>>>>>> 3dee132c888086f5fce2ae5fe5b9e2ed498562a2
    next();
});

app.use('/api', cliente_route);
app.use('/api', admin_route);
app.use('/api', cupon_route);
module.exports = app;
