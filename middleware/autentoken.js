var jsonwebtoken = require('jsonwebtoken');

exports.verificarToken = function(req,res,next){

    var token = req.query.token;
    
    jsonwebtoken.verify(token,'unhsdrgfiundf', (err,decoded)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                mensaje: 'token incorrecto',
                errores: err
            });
        }
        console.log("hola mundo");

        req.usuario = decoded.usuario;
        
        next();
    })

}