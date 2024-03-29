'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    titulo: { type: String, required: true },
    slug: { type: String, required: true },
    galeria: [{ type: Object, required: false }],
    portada: { type: String, required: true },
    precio: { type: String, required: true },
    descripcion: { type: String, required: true },
    contenido: { type: String, required: true },
    stock: { type: Number, default: 0, required: false },
    nventas: { type: Number, default: 0, required: true },
    npuntos: { type: Number, default: 0, required: true },
    categoria: { type: String, required: true },

    estado: { type: Date, default: 'Edicion', required: true },
    //fecha y hora de creacion en formato date(pasarlo a timestamp)
    createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('producto', ProductoSchema);
