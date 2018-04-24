var express = require('express');
var mongoose = require('mongoose');

var Proveedor = require('../models/proveedor.js'); //Conectamos la ruta con el modelo
var autentoken = require('../middleware/autentoken.js');

var app = express();

app.get('/', (req,res,next)=> {

    Proveedor.find({}).exec((err, proveedores)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            proveedores: proveedores
        });
       

    });

});

app.get('/:id',function(req,res,next){

    Proveedor.findById(req.params.id,(err,proveedor)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            proveedor: proveedor
        });
    });

});

app.post('/',(req,res)=>{ //En el cuerpo de las peticiones res que hagamos vamos a mandar un json

    var body = req.body;
    var proveedor = new Proveedor({
        nombre: body.nombre,
        cif: body.cif,
        domicilio: body.domicilio,
        cp: body.cp,
        localidad: body.localidad,
        provincia: body.provincia,
        telefono: body.telefono,
        email: body.email,
        contacto: body.contacto
    });

   proveedor.save((err, proveedorGuardado)=>{ //Guardar en la base de datos el objeto
       if (err){
           return res.status(400).json({
               ok: false,
               mensaje: 'Error al crear el proveedor',
               errores: err
           });
       }
       res.status(200).json({
            ok:true,
            proveedor: proveedorGuardado

       });
   });
    
});

app.put('/:id', function(req,res,next){

    Proveedor.findByIdAndUpdate(req.params.id, req.body, function(err,datos){ //Params es el paramtero id
        if (err) return next(err);
        res.status(201).json({
            ok: 'true',
            mensaje: 'Proveedor actualizado'
        });
    });

});
//Al pasar el parámetro autentoken.verificarToken comprueba que el token es correcto y que pertenece a ese usuario
app.delete('/:id', function(req,res,error){

    Proveedor.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Proveedor ' + datos.nombre + ' eliminado'
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });

    });

});

module.exports = app;