'use strict'
var Cliente = require('../models/cliente');
var bcrytp = require('bcrypt-nodejs')
const registro_cliente = async function (req, res) {
    //
    //REGISTRO:
    var data = req.body;
    var cliente_arr = [];
    //Validar mail si existe
    if (cliente_arr.length == 0) {
        //valida y encripta contraseña usando bcrypt
        if (data.password) {
            //encripta contraseña
            bcrytp.hash(data.password,null,null, async function (err,hash) {
               
               if (hash) {//si la contraseña esta encriptada
                console.log(hash)
                data.password=hash;//nuevo laor de la contraseña encriptada
                var reg = await Cliente.create(data); // Crea usuario
                res.status(200).send({ data:true}); //registra usuario
               }else{
                res.status(200).send({ message: "Error Server", data:undefined });
               }
               
            });
        } else {
            res.status(200).send({ message: "No hay una contraseña", data:undefined });
 
        } 
       
    } else {
        res.status(200).send({ message: "el correo ya existe en la base de datos", data:undefined });
    }



}

module.exports = {
    registro_cliente
}