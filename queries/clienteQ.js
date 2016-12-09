var cliente = require('../database/models/cliente');
var sequelize = require('sequelize');

var moduleCliente = {};
/*# GET #*/
moduleCliente.all=function(req, res, next){

     cliente.findAll().then(function(clientes) {
        res.json(clientes);
     }).catch(function(err){
		next(err);
	});

}

/*# GET #*/
moduleCliente.findByID= function(req, res, next){

    cliente
    .findOne({
        where: {
            cnpj: req.params.cnpj
        }
    })
    .then(function(cl) {
        res.json(cl || {});
     }).catch(function(err){
		next(err);
	});

}

/*# POST #*/
moduleCliente.insert=function(req, res, next){

     cliente.create(req.body).then(function(cliente) {
        res.json(cliente);
     }).catch(function(err){
		next(err);
	});

}


module.exports = moduleCliente;