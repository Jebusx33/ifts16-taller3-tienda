'use strict'
const Config = require('../models/config');
const fs = require('fs');
const path = require('path');


const obtener_config_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            let reg =await Config.findById({_id:'64ea50d5a61984d7fb807294'});
            res.status(200).send({data:reg});
        }else{
            res.status(500).send({messege: 'NoAccess'});
        }
    }else{
        res.status(500).send({messege: 'NoAccess'});
    }
}


const actualiza_config_admin = async function(req,res){
    if(req.user){
        if(req.user.role == 'admin'){
            let data = req.body;
           //console.log(data)
            if(req.files){
                //FALTA DESARROLLAR
            }else{
                let reg = await Config.findByIdAndUpdate({_id:'64ea50d5a61984d7fb807294'},{
                    categorias: data.categorias,
                    titulo: data.titulo,
                    serie: data.serie,
                    correlativo: data.correlativo
                });

                res.status(200).send({data:reg})
            }
            

            /*  Se creo el primer valor en la DB 
            await Config.create({
                categorias: [],
                titulo: 'Pepe',
                logo: 'logo.png',
                serie:1,
                correlativo: 1
            });*/

        }else{
            res.status(500).send({messege: 'NoAccess'});
        }
    }else{
        res.status(500).send({messege: 'NoAccess'});
    }
}

const obtener_logo = async function(req,res){
    var img = req.params['img'];
    console.log(img)

    fs.stat('./uploads/configuraciones/' + img, function(err){
        if(!err){
            let path_img = './uploads/configuraciones/' + img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = './uploads/default.jpg/';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });

}

/*const obtener_config_publico = async function(req,res){
    let reg =await Config.findById({_id:'64ea50d5a61984d7fb807294'});
    res.status(200).send({data:reg});
}*/

module.exports = {
    actualiza_config_admin,
    obtener_config_admin,
    obtener_logo,
    //obtener_config_publico
}