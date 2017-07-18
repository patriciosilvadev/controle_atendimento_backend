var db = require('../database/postgresqlDB');
var dateUtil = require('./utilQ');

/**
 * Insere na tabela atendimento
 */
function all(req, res, next){

    var mes=parseInt(req.params.mes);
    var dia=parseInt(req.params.dia);
    var ano=parseInt(req.params.ano);

    req.params.date= (ano+"-"+mes+"-"+dia);
    var dates = dateUtil.getDates(ano,mes,dia);

    db.tx(function(t) {
        return t.batch([   

            //ano
            t.oneOrNone("select sum(valor.valor) as total from atendimento "
                    +"inner join valor on atendimento.valor_id=valor.id "
                    +"inner join status on status.id=valor.status_id "
                    +"where status.descricao='FATURADO' AND "
                    +"extract(year from faturado_at)=${ano}",req.params),
            
            //mes
            t.oneOrNone("select sum(valor.valor) as total from atendimento "
                    +"inner join valor on atendimento.valor_id=valor.id "
                    +"inner join status on status.id=valor.status_id "
                    +"where status.descricao='FATURADO' AND "
                    +"faturado_at>=${mes_inicio} AND "
                    +"faturado_at<=${mes_fim}",dates),
            
            //semana
            t.oneOrNone("select sum(valor.valor) as total from atendimento "
                    +"inner join valor on atendimento.valor_id=valor.id "
                    +"inner join status on status.id=valor.status_id "
                    +"where status.descricao='FATURADO' AND "
                    +"faturado_at>=${semana_inicio} AND "
                    +"faturado_at<=${semana_fim}",dates),
            
            //nao aprovados
            t.oneOrNone("select sum(valor.valor) as total from atendimento "
                    +"inner join valor on atendimento.valor_id=valor.id "
                    +"inner join status on status.id=valor.status_id "
                    +"where status.descricao='NÃO APROVADO' AND "
                    +"created_at>=${mes_inicio} AND "
                    +"created_at<=${mes_fim}",dates),
                    
            //destaques
            t.any("select sum(valor.valor) as total, usuario.nome as nome from atendimento "
                    +"inner join valor on atendimento.valor_id=valor.id "
                    +"inner join status on status.id=valor.status_id "
                    +"inner join usuario on usuario.id=atendimento.usuario_id "
                    +"where status.descricao='FATURADO' AND "
                    +"faturado_at>=${mes_inicio} AND "
                    +"faturado_at<=${mes_fim} "
                    +"GROUP BY nome  ORDER BY total DESC",dates),

            //tipo
            t.any("select sum(valor.valor) as total, status.descricao as descricao from atendimento "
                    +"inner join valor on atendimento.valor_id=valor.id "
                    +"inner join status on status.id=valor.status_id "
                    +"where "
                    +"(created_at>=${mes_inicio} AND "
                    +"created_at<=${mes_fim} AND descricao!='FATURADO') OR (faturado_at>=${mes_inicio} AND "
                    +"faturado_at<=${mes_fim} AND descricao='FATURADO')"
                    +"GROUP BY descricao  ORDER BY total DESC",dates)
        ]);
    })
    .then(function(data) {
        var retorno={};
        retorno.total_ano=data[0].total || 0;
        retorno.total_mes=data[1].total|| 0;
        retorno.total_semana=data[2].total || 0;
        retorno.nao_aprovados=data[3].total|| 0;
        retorno.destaques=data[4]|| [];
        retorno.por_tipo=data[5] || [];
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
    var date = (year+"-"+month+"-"+day);
    var retorno = {
    };
    db.tx(function(t) {   
        return t.oneOrNone("select count(*) as total_atendimentos from atendimento "
                          +"where extract(year from data)=extract(year from to_date($1, 'YYYY-MM-DD'))",date);
    })
    .then(function(data) {
        retorno.porTipo=data;
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