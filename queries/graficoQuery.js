var db = require('../database/postgresqlDB');

/**
 * Insere na tabela atendimento
 */
function all(req, res, next){
    var retorno = {
    };
    db.tx(function(t) {   
        return t.oneOrNone("select count(*) as total_atendimentos from atendimento "
                          +"where extract(year from data_inicio)=${ano}",req.params)
        .then(data=>{
            retorno.atendimentoAno=parseInt(data.total_atendimentos);
            return t.oneOrNone("select count(*) as total_mes from atendimento "
                          +"where extract(year from data_inicio)=${ano} "
                          +"AND extract(MONTH from data_inicio)=${mes}",req.params);
        })
        .then(data=>{
            retorno.atendimentoMes=parseInt(data.total_mes);
            return t.any("select count(*) as total, "
            +"(select nome from usuario where usuario.usuario_id=atendimento.usuario_id) "
            +"from atendimento  where extract(year from data_inicio)=${ano} "
            +"AND extract(MONTH from data_inicio)=${mes} "
            +"GROUP BY usuario_id  ORDER BY total DESC",req.params);
        })
        .then(data=>{
            retorno.destaques=data;
            return t.any("select count(*) as total, "
            +"(select descricao from tipo_atendimento where tipo_atendimento.tipo_atendimento_id=atendimento.tipo_atendimento_id) "
            +"from atendimento  where extract(year from data_inicio)=${ano} "
            +"AND extract(MONTH from data_inicio)=${mes} "
            +"GROUP BY descricao  ORDER BY total DESC",req.params);
        });
    })
    .then(function(data) {
        retorno.porTipo=data;
        console.log(data);
        res.status(200)
        .json(retorno);
    })
    .catch(function(error) {
        // error
        next(error);
    })
}


module.exports = {
  all:all,
};