var cliente = require('../database/models/cliente');
var valor = require('../database/models/valor');
var usuario = require('../database/models/usuario');
var atendimento = require('../database/models/atendimento');
var status = require('../database/models/status');
var db = require('../database/_db');
var dot = require('dot-object');

/*# GET #*/
function allAnoMes(req, res, next){
	var mes=parseInt(req.params.mes);
    var ano=parseInt(req.params.ano);

    var dtInicial= new Date(ano,mes,1);
    var dtFinal= new Date(ano,dtInicial.getMonth()+1,0);;

    var filter = {};
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

    atendimento.findAll(filter).then(function(atendimentos) {
        atendimentos.forEach(function(at) {
            dot.object(at);
        });
        res.json(atendimentos);
    }).catch(function(err){
        next(err);
    });

}

/**
 * Fatura Atendimento por ID
 */
function faturar(req, res, next){
	var id=parseInt(req.params.id);
	
	valor.findById(id)
	.then(function(instance) {
		instance.updateAttributes({
			status_id:req.body.status_id,
            motivo:req.body.motivo,
			faturado_at:new Date()
		}).then(instance=>{
            res.json(instance);
        });
	})
	.catch(function(error) {
		// error
		next(error);
	});

}


module.exports = {
  allAnoMes:allAnoMes,
  faturar:faturar
};