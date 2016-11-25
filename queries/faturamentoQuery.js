var db = require('../database/postgresqlDB');

function all(req, res, next){

	var usuario_id = parseInt(req.params.usuario_id);

	db.any("SELECT * FROM ATENDIMENTO "
		+"LEFT JOIN CLIENTE "+
		"ON CLIENTE.CNPJ=ATENDIMENTO.cliente_id "
		+"LEFT JOIN TIPO_ATENDIMENTO ON "
		+"ATENDIMENTO.tipo_atendimento_id=tipo_atendimento.tipo_atendimento_id "
		+"INNER JOIN ATENDIMENTO_VALOR ON ATENDIMENTO_VALOR.at_id=ATENDIMENTO.ATENDIMENTO_ID "
		+"LEFT JOIN (SELECT username , usuario_id  FROM USUARIO) U ON "
		+"ATENDIMENTO.usuario_id=U.usuario_id "
		+"ORDER BY aberto DESC, data_inicio DESC")
	.then(function(data){
		res.status(200)
		.json(data);
	})
	.catch(function(err){
		next(err);
	});

}

/**
 * Fatura Atendimento por ID
 */
function faturar(req, res, next){
	req.params.id=parseInt(req.params.id);
	db.tx(function(t) {
		return t.none("update atendimento_valor set status='faturado' where at_id=${id}",req.params)
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
	});

}


module.exports = {
  all:all,
  faturar:faturar
};