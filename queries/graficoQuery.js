const db = require('../database/postgresqlDB');
const dateUtil = require('./utilQ');



/**
 * Insere na tabela atendimento
 */
const all = (req, res, next) =>{
    const retorno = {
    };

    const mes=parseInt(req.params.mes);
    const dia=parseInt(req.params.dia);
    const ano=parseInt(req.params.ano);


    const dates = dateUtil.getDates(ano,mes,dia);


    db.tx( t => {   
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
    .then( data => {
        const retorno={};
        retorno.total_ano=data[0].total || 0;
        retorno.total_mes=data[1].total || 0;
        retorno.total_semana=data[2].total || 0;
        retorno.total_visitas=data[3].total || 0;
        retorno.destaques=data[4] || [];
        retorno.por_tipo=data[5] || [];
        res.status(200)
        .json(retorno);
    })
    .catch( error => {
        // error
        next(error);
    })
}  

const teste = (req, res, next) =>{
    const month=parseInt(req.params.month)-1;
    const day=parseInt(req.params.day);
    const year=parseInt(req.params.year);
    const date = (year+"-"+month+"-"+day);
    const retorno = {
    };
    db.tx((t) =>{   
        return t.oneOrNone("select count(*) as total_atendimentos from atendimento "
                          +"where extract(year from created_at)=extract(year from to_date($1, 'YYYY-MM-DD'))",date);
    })
    .then((data) =>{
        retorno.porTipo=data;
        res.status(200)
        .json(retorno);
    })
    .catch((error) =>{
        // error
        next(error);
    })
   
}


module.exports = {
  all:all,
  teste:teste
};