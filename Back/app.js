'use strict'
var express = require('express');
var app = express ();
var bodyparser = require ('body-parser');
var mongoose = require('mongoose');
var port = process.env.Port || 4201;

var admin_route = require('./routes/admin');
var cliente_route = require('./routes/cliente');

mongoose.connect('mongodb://127.0.0.1:27017/tienda',{useUnifiedTopology: true}, (err,res)=>{
    if (err) {
        console.log(err);
    } else {
        
        app.listen(port, function() {
            console.log("servidor corriendo en el puerto: "+ port);
        });
    }
});

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limt: '50mb', extended:true}));

app.use((req,res,next)=>{
    res.heather('Acces-Control-Allow-Origin','*');
    res.heather('Acces-Control-Allow-Heather','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Acces-Control-Allow-Request-Method');
    res.heather('Acces-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.heather('allow', 'GET, PUT, POST, DELETE, OPTION');
    next();
});

app.use('/api', cliente_route);
app.use('/api', admin_route);
module.exports = app;