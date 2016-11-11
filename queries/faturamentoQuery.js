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
 * Insere na tabela atendimento
 */
function insert(req, res, next){

	db.tx(function(t) {
		return t.oneOrNone("Select cnpj from cliente where nome=${nome}",req.body)
		.then(cliente=>{
				if(cliente==null){
					return t.one('INSERT INTO cliente(cnpj,nome)'
							+'VALUES(${cnpj},${nome}) RETURNING cnpj', req.body);
				}else{
					return cliente;
				}
			})
		.then(()=> {
			req.body.data_inicio= new Date();
			return t.one('INSERT INTO atendimento(data_inicio,'
				+'contato, tipo_acesso, chamado, problema, solucao, '
				+'tipo_atendimento_id, usuario_id, cliente_id, aberto) '
				+'VALUES(${data_inicio},'
				+'${contato},${tipo_acesso},${chamado},${problema},'
				+'${solucao},(select tipo_atendimento_id from tipo_atendimento where descricao=${tipo_atendimento}),'
				+'${userId},'
				+'${cnpj},true) RETURNING atendimento_id', req.body);
		})
		.then(atendimento=>{

			if(req.body.tipo_atendimento==="Avulso Online" ||
			req.body.tipo_atendimento==="Avulso Local"){
				req.body.atendimento_id=atendimento.atendimento_id;
				return t.none("INSERT INTO atendimento_valor "
				+"(valor, aprovado, faturado, at_id)"
				+" VALUES (${valor}, ${aprovado}, false,${atendimento_id})",req.body);
			}
			else{
				return atendimento;
			}
		});
	})
	.then(function(data) {
		// data = as returned from the transaction's callback
		console.log(data);
		res.status(200)
		.json({
			status: true,
			data:data,
			message: 'Atualizado com sucesso'
		});
	})
	.catch(function(error) {
		// error
		next(error);
	});

}

/**
 * Insere na tabela atendimento
 */

function update(req, res, next){

	db.tx(function(t) {
		return t.none("update atendimento set cnpj from cliente where nome=${nome}",req.body)
		.then(()=> {
			req.body.data_inicio= new Date();
			return t.one('INSERT INTO atendimento(data_inicio,'
				+'contato, tipo_acesso, chamado, problema, solucao, '
				+'tipo_atendimento_id, usuario_id, cliente_id, aberto) '
				+'VALUES(${data_inicio},'
				+'${contato},${tipo_acesso},${chamado},${problema},'
				+'${solucao},(select tipo_atendimento_id from tipo_atendimento where descricao=${tipo_atendimento}),'
				+'${userId},'
				+'${cnpj},true) RETURNING atendimento_id', req.body);
		})
		.then(atendimento=>{

			if(req.body.tipo_atendimento==="Avulso Online" ||
			req.body.tipo_atendimento==="Avulso Local"){
				req.body.atendimento_id=atendimento.atendimento_id;
				return t.none("INSERT INTO atendimento_valor "
				+"(valor, aprovado, faturado, at_id)"
				+" VALUES (${valor}, ${aprovado}, false,${atendimento_id})",req.body);
			}
			else{
				return atendimento;
			}
		});
	})
	.then(function(data) {
		// data = as returned from the transaction's callback
		console.log(data);
		res.status(200)
		.json({
			status: true,
			data:data,
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
  insert:insert
};