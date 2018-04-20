var mongoose = require('mongoose');
var unique = require('mongoose-unique-validator');


var PresupuestoSchema = new mongoose.Schema({
    presupuesto: String, //Propiedades que tiene el modelo
    cif: { type:String },
    base: Number,
    tipo: Number,
    importe: String,
    total: String,
    irpf: String,
    retencion: Boolean,
    fecha: String,
    fechaRegistro:Date,
    concepto: String
});

// PresupuestoSchema.plugin(unique, {message: 'El cif introducido ya existe'});

module.exports = mongoose.model('Presupuesto',PresupuestoSchema);