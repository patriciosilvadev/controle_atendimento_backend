var cliente = require('../database/models/cliente');
var sequelize = require('sequelize');

/*# GET #*/
function all(req, res, next){

     cliente.findAll().then(function(clientes) {
        res.json(clientes);
     }).catch(function(err){
		next(err);
	});

}

/*# POST #*/
function insert(req, res, next){

     cliente.create(req.body).then(function(cliente) {
        res.json(cliente);
     }).catch(function(err){
		next(err);
	});

}


module.exports = {
    insert:insert,
    all:all
};