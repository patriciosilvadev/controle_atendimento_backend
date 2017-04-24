var db = require('../database/postgresqlDB');
var dateUtil = require('./utilQ');



/**
 * Insere na tabela atendimento
 */
function all(req, res, next){
var retorno = {
    };

    var mes=parseInt(req.params.mes);
    var dia=parseInt(req.params.dia);
    var ano=parseInt(req.params.ano);


    var dates = dateUtil.getDates(ano,mes,dia);


    db.tx(function(t) {   
        return t.batch([

            //total ano
            t.oneOrNone("select count(*) as total from atendimento "
                        +"where extract(year from created_at)=${ano}",req.params),

            //total mes
            t.oneOrNone("select count(*) as total from atendimento "
                        +"where created_at>=${mes_inicio} AND "
                        +"created_at<=${mes_fim}",dates),

            //total semana
            t.oneOrNone("select count(*) as total from atendimento "
                        +"where created_at>=${semana_inicio} AND "
                        +"created_at<=${semana_fim}",dates),
            
            //total chamado - mes
            t.oneOrNone("select count(*) as total from atendimento "
                        +"where chamado=true AND created_at>=${mes_inicio} AND "
                        +"created_at<=${mes_fim}",dates),
            

            //destaques mes 
            t.any("select count(*) as total, "
                +"usuario.nome as nome "
                +"from atendimento INNER JOIN usuario ON atendimento.usuario_id=usuario.id "
                +"where created_at>=${mes_inicio} AND "
                +"created_at<=${mes_fim} "
                +"GROUP BY nome  ORDER BY total DESC",dates),

            //total por tipo
            t.any("select count(*) as total, "
                +"tipo_atendimento.descricao as descricao "
                +"from atendimento INNER JOIN tipo_atendimento "
                +"ON atendimento.tipo_atendimento_id=tipo_atendimento.id "
                +"where created_at>=${mes_inicio} AND "
                +"created_at<=${mes_fim} "
                +"GROUP BY descricao  ORDER BY total DESC",dates)
            ]);
    })
    .then(function(data) {
        var retorno={};
        retorno.total_ano=data[0].total || 0;
        retorno.total_mes=data[1].total || 0;
        retorno.total_semana=data[2].total || 0;
        retorno.total_visitas=data[3].total || 0;
        retorno.destaques=data[4] || [];
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
    console.log("Month"+month);
    var date = (year+"-"+month+"-"+day);
    console.log(date);
    var retorno = {
    };
    db.tx(function(t) {   
        return t.oneOrNone("select count(*) as total_atendimentos from atendimento "
                          +"where extract(year from created_at)=extract(year from to_date($1, 'YYYY-MM-DD'))",date);
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