var express = require('express');
var mongoose = require('mongoose');

var Factura = require('../models/factura.js'); //Conectamos la ruta con el modelo

var app = express();

app.get('/', (req,res,next)=> {

    Factura.find({}).exec((err, facturas)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            facturas: facturas
        });
       

    });

});

app.get('/:id',function(req,res,next){

    Factura.findById(req.params.id,(err,factura)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            factura: factura
        });
    });

});

app.post('/',(req,res)=>{ //En el cuerpo de las peticiones res que hagamos vamos a mandar un json

    var body = req.body;
    var factura = new Factura({
        proveedor: body.proveedor,
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

   factura.save((err, facturaGuardada)=>{ //Guardar en la base de datos el objeto
       if (err){
           return res.status(400).json({
               ok: false,
               mensaje: 'Error al crear la factura',
               errores: err
           });
       }
       res.status(200).json({
            ok:true,
            factura: facturaGuardada

       });
   });
    
});

app.put('/:id', function(req,res,next){

    Factura.findByIdAndUpdate(req.params.id, req.body, function(err,datos){ //Params es el paramtero id
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Factura actualizada'
        });
    });

});

app.delete('/:id', function(req,res,error){

    Factura.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Factura ' + datos.cif + ' eliminada'
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });

    });

});

module.exports = app;