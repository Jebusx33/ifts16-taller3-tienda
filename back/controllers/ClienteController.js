'use strict'
var Cliente = require('../models/cliente');
var bcrytp = require('bcrypt-nodejs')
var jwt = require('../helpers/jwt');
const admin = require('../models/admin');
const cliente = require('../models/cliente');

//Registro Cliente
const registro_cliente = async function(req, res) {
    //
    var data = req.body;
    var cliente_arr = [];
    //Validar mail si existe
    if (cliente_arr.length == 0) {
        //valida y encripta contraseña usando bcrypt
        if (data.password) {
            //encripta contraseña
            bcrytp.hash(data.password, null, null, async function(err, hash) {
                if (hash) { //si la contraseña esta encriptada
                    console.log(hash)
                    data.password = hash; //nuevo valor de la contraseña encriptada
                    var reg = await Cliente.create(data); // Crea usuario
                    res.status(200).send({
                        data: reg
                    }); //registra usuario
                } else {
                    res.status(200).send({
                        message: "Error Server",
                        data: undefined
                    });
                }
            });
        } else {
            res.status(200).send({
                message: 'No hay una contraseña \n"mensaje desde el backend"',
                data: undefined
            });
        }
    } else {
        res.status(200).send({
            message: 'el correo ya existe en la base de datos \n"mensaje desde el backend"',
            data: undefined
        });
    }
}

//Login Cliente
const login_cliente = async function(req, res) {
    var data = req.body;
    //verifica si el coreo existe en la BD
    var cliente_arr = []

    cliente_arr = await Cliente.find({
            email: data.email
        }) //busca el mail del cliente y lo encierrra en el array

    if (cliente_arr.length == 0) { //si el array esta vacio no hay usuario registrado con el mail buscado
        res.status(200).send({
            message: 'No se encontro el email \n"mensaje desde el backend"',
            data: undefined
        })
    } else {
        //LOGIN
        let user = cliente_arr[0];
        //desencripta y verifica si la contraseña coincide con la BD
        bcrytp.compare(data.password, user.password, async function(error, check) {
            if (check) {
                // console.log(user)
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({
                    message: 'La contraseña no coincide \n"mensaje desde el backend"',
                    data: undefined
                });
            }
        });
    }
}

//CRUD Cliente
const listar_clientes_filtro_admin = async function(req, res) {
    let tipo = req.params['tipo'];
    let filtro = req.params['filtro'];
    /* let reg = await cliente.find();
     res.status(200).send({ data: reg });*/
    // console.log(tipo);
    //si el valor es nulo o un strin null muestra todo
    if (req.user) {
        if (req.user.role == 'admin') {

            if (tipo == null || tipo == 'null') {
                let reg = await cliente.find();
                res.status(200).send({
                    data: reg
                });
            } else {
                //filtro
                if (tipo == 'apellidos') {
                    let reg = await Cliente.find({
                        apellidos: new RegExp(filtro, 'i')
                    });
                    res.status(200).send({
                        data: reg
                    });
                } else if (tipo == 'correo') {
                    let reg = await Cliente.find({
                        email: new RegExp(filtro, 'i')
                    });
                    res.status(200).send({
                        data: reg
                    });
                }
            }
        } else {
            res.status(500).send({
                message: 'NoAccess'
            });
        }
    } else {
        res.status(500).send({
            message: 'NoAccess'
        });
    }




}


const registro_cliente_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {
            var data = req.body;

            bcrytp.hash('123456', null, null, async function name(err, hash) {
                if (hash) {
                    data.password = hash;
                    let reg = await Cliente.create(data);
                    res.status(200).send({ data: reg });
                } else {
                    res.status(200).send({
                        message: "Error en el servidor",
                        data: undefined
                    });
                }
            });
        } else {
            res.status(500).send({
                message: 'NoAccess'
            });
        }
    } else {
        res.status(500).send({
            message: 'NoAccess'
        });
    }
}


const obtener_cliente_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id'];
            //console.log(id);
            try { //valida que la ruta y el id sean correctos
                var reg = await Cliente.findById({ _id: id });

                //envia los datos del cliente al front por id
                res.status(200).send({ data: reg });
                //  console.log(reg);
            } catch (error) {
                res.status(200).send({ data: undefined });

            }

        } else {
            res.status(500).send({
                message: 'NoAccess'
            });
            //   console.log("no encotro ID")
        }
    } else {
        res.status(500).send({
            message: 'NoAccess'
        });
    }
}

const actualizar_cliente_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id'];
            var data = req.body;
            // console.log(id);
            var reg = await Cliente.findByIdAndUpdate({ _id: id }, {
                nombres: data.nombres,
                apellidos: data.apellidos,
                pais: data.pais,
                email: data.mail,
                perfil: data.perfil,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                tipoDni: data.tipoDni,
                dni: data.dni,
                genero: data.genero
            });
            res.status(200).send({ data: reg }); //envia los datos al front
        } else {
            res.status(500).send({
                message: 'NoAccess'
            });
        }
    } else {
        res.status(500).send({
            message: 'NoAccess'
        });
    }
}


const eliminar_cliente_admin = async function(req, res) {
    if (req.user) {
        if (req.user.role == 'admin') {

            var id = req.params['id'];
            let reg = await Cliente.findByIdAndRemove({ _id: id });
            res.status(200).send({ data: reg }); //envia los datos al front
        } else {
            res.status(500).send({
                message: 'NoAccess'
            });
        }
    } else {
        res.status(500).send({
            message: 'NoAccess'
        });
    }
}


module.exports = {
    registro_cliente,
    login_cliente,
    listar_clientes_filtro_admin,
    registro_cliente_admin,
    obtener_cliente_admin,
    actualizar_cliente_admin,
    eliminar_cliente_admin
}