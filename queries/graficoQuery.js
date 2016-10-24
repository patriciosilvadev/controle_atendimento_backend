var db = require('../database/postgresqlDB');

/**
 * Insere na tabela atendimento
 */
function all(req, res, next){
     //    console.log(req.params);
    var retorno = {
            atendimentoAno:0,
            atendimentoMes:0
    };
    db.tx(function(t) {   
        return t.one("select count(*) as total_atendimentos from atendimento "
                          +"where extract(year from data_inicio)=${ano}",req.params)
        .then(data=>{
            retorno.atendimentoAno=parseInt(data.total_atendimentos);
            return t.one("select count(*) as total_mes from atendimento "
                          +"where extract(year from data_inicio)=${ano}",req.params);
        });
    })
    .then(function(data) {
        retorno.atendimentoMes=parseInt(data.total_mes);
        console.log(retorno);
        res.status(200)
        .json({
          status: true,
          data:retorno,
          message: 'Atualizado com sucesso'
        });
    })
    .catch(function(error) {
        // error
        next(error);
    })
}


module.exports = {
  all:all,
};