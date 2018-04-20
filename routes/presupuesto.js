var express = require('express');
var mongoose = require('mongoose');

var Presupuesto = require('../models/presupuesto.js'); //Conectamos la ruta con el modelo

var app = express();

app.get('/', (req,res,next)=> {

    Presupuesto.find({}).exec((err, presupuestos)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            presupuestos: presupuestos
        });
       

    });

});

app.get('/:id',function(req,res,next){

    Presupuesto.findById(req.params.id,(err,presupuestos)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            presupuestos: presupuestos
        });
    });

});

app.post('/',(req,res)=>{ //En el cuerpo de las peticiones res que hagamos vamos a mandar un json

    var body = req.body;
    var presupuesto = new Presupuesto({
        presupuesto: body.presupuesto,
        cif: body.cif,
        base: body.base,
        tipo: body.tipo,
        importe: body.importe,
        total: body.total,
        irpf: body.irpf,
        retencion: body.retencion,
        fecha: body.fecha,
        fechaRegistro:body.fechaRegistro,
        concepto: body.concepto
    });

   presupuesto.save((err, presupuestoGuardado)=>{ //Guardar en la base de datos el objeto
       if (err){
           return res.status(400).json({
               ok: false,
               mensaje: 'Error al crear el presupuesto',
               errores: err
           });
       }
       res.status(200).json({
            ok:true,
            presupuesto: presupuestoGuardado

       });
   });
    
});

app.put('/:id', function(req,res,next){

    Presupuesto.findByIdAndUpdate(req.params.id, req.body, function(err,datos){ //Params es el paramtero id
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Presupuesto actualizada'
        });
    });

});

app.delete('/:id', function(req,res,error){

    Presupuesto.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Presupuesto ' + datos.cif + ' eliminado'
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });

    });

});

module.exports = app;