var cliente = require('../database/models/cliente');
var sequelize = require('sequelize');
var StringMask = require('string-mask');

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

    var cnpj = applyMask(req.params.cnpj);
    console.log(cnpj);
    cliente
    .findOne({
        where: {
            cnpj: cnpj
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

/**
 * Pega Numero
 */
function getNumber(str){
    if(str===undefined){
        str="";
    }
    return str.replace(/[^\d]/g, '').slice(0, 14)
}

/**
 * Aplica Mascara
 */
function applyMask(str){
    var number = getNumber(str);
    var cnpj = new StringMask('00.000.000\/0000-00');
    var cpf = new StringMask('000.000.000-00');
    var mascara ="";
    if(number.length>11){
        mascara = cnpj.apply(number);
    }else{
        mascara = cpf.apply(number);
    }
    return mascara.trim().replace('/[^0-9]$/', '');
}



module.exports = moduleCliente;