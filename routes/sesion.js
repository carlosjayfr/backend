var express = require('express');
var bcryptjs = require('bcryptjs');

var Sesion = require('../models/sesion.js');

var app = express();

app.post('/', function(req,res,next){
    var body = req.body;
    var sesion = new Sesion({
        nombre: body.nombre,
        login: body.login,
        logout: body.logout,
        duracion: body.duracion

    });

    sesion.save((err,sesionGuardada)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                mensaje:'Error al registrar la sesión',
                errores: err
            });
        }

        res.status(200).json({
            ok: true,
            sesion: sesionGuardada
        });

    });
    
});

app.get('/', (req,res,next)=> {

    var nombre = req.query.nombre;

    Sesion.find({nombre:nombre})
          .sort({_id:-1})
          .exec((err, sesiones)=>{
        if (err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            sesiones: sesiones
        });
        

    });

});

//De momento no lo necesitamos pero puede que lo necesitemos

app.delete('/:id', function(req,res,error){

    Sesion.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'La sesión fue eliminada'
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });

    });

});

module.exports = app;

/*
    app.peticionHttp(funcion callback){
        leer el mensaje
        crea el objeto con la clase mongoose
        objeto .metodoMongoose(funcion callback){
            gestion de la respuesta
        }
    }

*/ 