var db = require('../database/postgresqlDB');

/**
 * Insere na tabela atendimento
 */
function all(req, res, next){
    var retorno = {
    };

    var mes=parseInt(req.params.mes);
    var dia=parseInt(req.params.dia);
    var ano=parseInt(req.params.ano);

    req.params.date= (ano+"-"+mes+"-"+dia);
    db.tx(function(t) {   
        return t.oneOrNone("select sum(valor) as total_ano from atendimento "
                          +"inner  join atendimento_valor on "
                          +"atendimento.atendimento_id=atendimento_valor.at_id AND "
                          +"atendimento_valor.status='faturado' AND "
                          +"extract(year from data)=${ano}",req.params)
        .then(data=>{
            retorno.total_ano=parseFloat(data.total_ano);
            return t.oneOrNone("select sum(valor) as total_mes from atendimento "
                        +"inner  join atendimento_valor on "
                        +"atendimento.atendimento_id=atendimento_valor.at_id AND "
                        +"atendimento_valor.status='faturado' AND "
                        +"extract(year from data)=${ano} AND "
                        +"extract(MONTH from data)=${mes}",req.params);
        })
        .then(data=>{
            retorno.total_mes=parseFloat(data.total_mes);
            return t.oneOrNone("select sum(valor) as nao_aprovados from atendimento "
                        +"inner  join atendimento_valor on "
                        +"atendimento.atendimento_id=atendimento_valor.at_id AND "
                        +"atendimento_valor.status='não aprovado' AND "
                        +"extract(year from data)=${ano} AND "
                        +"extract(MONTH from data)=${mes}",req.params);
        })
        .then(data=>{
            retorno.nao_aprovados=parseFloat(data.nao_aprovados);
            return t.any("select sum(valor) as total, nome from atendimento "
            +"inner  join atendimento_valor on "
            +"atendimento.atendimento_id=atendimento_valor.at_id AND "
            +"atendimento_valor.status='faturado' AND "
            +"extract(year from data)=${ano} AND "
            +"extract(MONTH from data)=${mes} "
            +"inner  join usuario on "
            +"atendimento.usuario_id=usuario.usuario_id "
            +"GROUP BY nome  ORDER BY total DESC",req.params);
        })
        .then(data=>{
            retorno.destaques=data;
            return t.oneOrNone("select sum(valor) as total_semana from atendimento "
                        +"inner  join atendimento_valor on "
                        +"atendimento.atendimento_id=atendimento_valor.at_id AND "
                        +"atendimento_valor.status='faturado' AND "
                        +"extract(year from data)=${ano} AND "
                        +"extract(MONTH from data)=${mes} AND "
            +"extract(WEEK from data)= extract(WEEK from to_date(${date}, 'YYYY-MM-DD'))",req.params);
         })
        .then(data=>{
            retorno.total_semana=parseInt(data.total_semana);
            //retorno.semana=data;
            return t.any("select sum(valor) as total_tipo, status as descricao from atendimento "
            +"inner  join atendimento_valor on "
            +"atendimento.atendimento_id=atendimento_valor.at_id AND "
            +"atendimento_valor.status!='aprovado' AND "
            +"extract(year from data)=${ano} AND "
            +"extract(MONTH from data)=${mes} "
            +"GROUP BY descricao  ORDER BY total_tipo DESC",req.params);
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

function teste(req, res, next){
    var month=parseInt(req.params.month)-1;
    var day=parseInt(req.params.day);
    var year=parseInt(req.params.year);
    console.log("Month"+month);
    var date = (year+"-"+month+"-"+day);
    console.log(date);
    var retorno = {
    };
    db.tx(function(t) {   
        return t.oneOrNone("select count(*) as total_atendimentos from atendimento "
                          +"where extract(year from data)=extract(year from to_date($1, 'YYYY-MM-DD'))",date);
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
  teste:teste
};