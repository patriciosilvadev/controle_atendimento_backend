const cliente = require('../database/models/cliente');
const valor = require('../database/models/valor');
const usuario = require('../database/models/usuario');
const atendimento = require('../database/models/atendimento');
const status = require('../database/models/status');
const db = require('../database/_db');
const dot = require('dot-object');

/*# GET #*/
const allAnoMes = (req, res, next) => {

    const {mes, ano} = req.params;

    const dtInicial= new Date(ano,mes,1);
    const dtFinal= new Date(ano,dtInicial.getMonth()+1,1);;

    const filter = {};
    filter.include= [{
				model: valor,
				include: [status],
				required: true
        	} , 
			cliente,
			usuario]
    filter.raw= true;
    filter.order= [['created_at', 'DESC']]
    filter.where={
        created_at:{
            $gte: dtInicial,
            $lte: dtFinal
        }
    };

    atendimento.findAll(filter).then( atendimentos => {
        atendimentos.forEach( at => {
            dot.object(at);
        });
        res.json(atendimentos);
    }).catch(function(err){
        next(err);
    });

}

/*# GET #*/
const allByClienteID = (req, res, next) => {
	const client=req.params.clientID;
   
    const filter = {};
    filter.include= [{
				model: valor,
				include: [status],
				required: true
        	} , 
			cliente,
			usuario]
    filter.raw= true;
    filter.order= [['created_at', 'DESC']]
    filter.where={
        created_at:{
            $gte: dtInicial,
            $lte: dtFinal
        }
    };

    atendimento.findAll(filter).then( atendimentos => {

        atendimentos.forEach( at =>  {
            dot.object(at);
        });
        res.json(atendimentos);

    }).catch( err => {
        next(err);
    });

}

/**
 * Fatura Atendimento por ID
 */
const faturar = (req, res, next) => {
	const id=parseInt(req.params.id);
	valor.findById(id)
	.then(instance => {
		instance.updateAttributes({
			status_id:req.body.status_id,
            motivo:req.body.motivo,
			faturado_at: req.body.faturado_at || new Date()
		}).then(instance => {
            res.json(instance);
        });
	})
	.catch( error => {
		// error
		next(error);
	});

}

module.exports = {
  allAnoMes:allAnoMes,
  faturar:faturar
};