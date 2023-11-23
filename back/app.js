'use strict'
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.Port || 4201;

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors: {origin : '*'}
});

io.on('connection',function(socket){
    socket.on('delete-carrito',function(data){
        io.emit('new-carrito',data);
        console.log(data);
    });

    socket.on('add-carrito-add',function(data){
        io.emit('new-carrito-add',data);
        console.log(data);
    });
    
});

const cors = require('cors')
const whiteList = ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:14185']
var admin_routes = require('./routes/admin');
var cliente_routes = require('./routes/cliente');
var producto_routes = require('./routes/producto');
var cupon_route = require('./routes/cupon');
var config_route = require('./routes/config');
var carrito_route = require('./routes/carrito');
//var venta_route = require('./routes/venta');
//var descuento_route = require('./routes/descuento');

app.use(cors({ origin: whiteList }))
    //mongoose.connect('mongodb://127.0.0.1:27017/tienda', { useUnifiedTopology: true }, (err, res) => {
    //mongoose.connect('mongodb+srv://esteban:JA4X37KWL2gO6WQn@tienda.x2y8zuw.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, res) => {
    //mongoose.connect('mongodb+srv://cjelovcic:JA4X37KWL2gO6WQn@cluster0.c8etjmh.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, res) => {
    mongoose.connect('mongodb+srv://cintia:JA4X37KWL2gO6WQn@tienda.rugou8x.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, res) => {
    //mongoose.connect('mongodb+srv://maxi:JA4X37KWL2gO6WQn@tienda.nbjhw7a.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, res) => {   
    //mongoose.connect('mongodb+srv://jesus:JA4X37KWL2gO6WQn@tienda.lfc0qtf.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err, res) => {
    if (err) {
        console.log(err);
    } else {

        server.listen(port, function() {
            console.log("\n**** servidor corriendo en ==> http://localhost:" + port + " ****** \n");
        });
    }
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limt: '50mb', extended: true }));

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Heather', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Acces-Control-Allow-Request-Method');
    res.header('Acces-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('allow', 'GET, PUT, POST, DELETE, OPTION');
    next();
});

app.use('/api', cliente_routes);
app.use('/api', admin_routes);
app.use('/api', producto_routes);
app.use('/api', cupon_route);
app.use('/api', config_route);
app.use('/api', carrito_route);
//app.use('/api', venta_route);
//app.use('/api', descuento_route);
module.exports = app;