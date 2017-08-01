const cliente = require('../database/models/cliente');
const sequelize = require('sequelize');
const StringMask = require('string-mask');

const moduleCliente = {};

/**
 * Get All registered Clientes
 */
moduleCliente.all = (req, res, next) => {

     cliente.findAll().then((clientes) => {
        res.json(clientes);
     }).catch((err)=>{
		next(err);
	});

}

/**
 * Get Clientes by their cnpj
 */
moduleCliente.findByCNPJ = (req, res, next) => {

    const cnpj = applyMask(req.params.cnpj);
    cliente
    .findOne({
        where: {
            cnpj: cnpj
        }
    })
    .then((cl) => {
        res.json(cl || null);
     }).catch((err) => {
		next(err);
	});

}

/**
 * Insert a new Client
 */
moduleCliente.insert = (req, res, next) => {
    const { cnpj, nome } = req.body;
    cliente.findOrCreate({where: {cnpj: req.body.cnpj}, defaults: { cnpj, nome }})
    .then((cliente) => {
        res.json(cliente[0]);
    }).catch( (err) => {
        next(err);
    });

}

/**
 * Get Number from a given string
 */
const getNumber = (str) =>{
    if(str===undefined){
        str="";
    }
    return str.replace(/[^\d]/g, '').slice(0, 14)
}

/**
 * Apply CNPJ or CPF mask 
 */
const applyMask = (str) => {
    const number = getNumber(str);
    const cnpj = new StringMask('00.000.000\/0000-00');
    const cpf = new StringMask('000.000.000-00');
    const mascara ="";
    if(number.length>11){
        mascara = cnpj.apply(number);
    }else{
        mascara = cpf.apply(number);
    }
    return mascara.trim().replace('/[^0-9]$/', '');
}



module.exports = moduleCliente;