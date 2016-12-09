var usuario = require('../database/models/usuario');
var sequelize = require('sequelize');
var config = require('../config'); 
var jwt    = require('jsonwebtoken');


var moduleUsuario = {};

/*# GET #*/
moduleUsuario.findByID= function(req, res, next){

    usuario
    .findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(usuario) {
        res.json(usuario);
     }).catch(function(err){
		next(err);
	});

}

/*# Update Usuario #*/
moduleUsuario.update= function(req, res, next){

    usuario
    .findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(user) {
        user.updateAttributes(
            req.body
        ).then(user=>{
            res.json(user);
        });
     }).catch(function(err){
		next(err);
	});

}

/**
 * Endpoint usado pelo servico da aplicacao
 */
moduleUsuario.login=function(req,res,next){
    console.log(req.body);

    usuario
    .findOne({
        raw: true,
        where: {
            password: req.body.password,
            $or: [{username: req.body.username}, {email: req.body.username}]
        }

    })
    .then(user=> {

        console.log("Usuario " +user.username+" logado com sucesso!");
        user.token = jwt.sign(user, config.secret , {
        expiresIn : 60*60*24 // expires in 24 hours
    
        });
        res.status(200).json(user);
     })
    .catch(function (err) {
        res.status(403).json(err);
    });

}



/*# POST #*/
function insert(req, res, next){

   /*  cliente.create(req.body).then(function(cliente) {
        res.json(cliente);
     }).catch(function(err){
		next(err);
	});
*/
}


module.exports  = moduleUsuario;