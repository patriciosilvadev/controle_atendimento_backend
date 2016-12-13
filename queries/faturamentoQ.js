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
	/*req.params.id=parseInt(req.params.id);
	req.params.data=new Date();
	db.tx(function(t) {
		return t.none("update atendimento_valor set status='faturado',"
		+"data=${data} where at_id=${id}",req.params)
	})
	.then(function(data) {
		res.status(200)
		.json({
			status: true,
			message: 'Atualizado com sucesso'
		});
	})
	.catch(function(error) {
		// error
		next(error);
	});*/

}


module.exports = {
  allAnoMes:allAnoMes,
  faturar:faturar
};