var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');


var ClienteSchema = new mongoose.Schema({
    nombre: String, //Propiedades que tiene el modelo
    domicilio: String,
    cif: { type:String, unique: true },
    cp: Number,
    localidad: String,
    provincia: String,
    telefono: String,
    email: String,
    contacto: String
});

ClienteSchema.plugin(unique, {message: 'El cif introducido ya existe'});

module.exports = mongoose.model('Cliente',ClienteSchema);