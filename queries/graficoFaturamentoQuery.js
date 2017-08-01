const db = require('../database/postgresqlDB');
const dateUtil = require('./utilQ');

/**
 * Insere na tabela atendimento
 */
function all(req, res, next){

    const { mes, dia, ano } = req.params;

    req.params.date= (ano+"-"+mes+"-"+dia);
    const dates = dateUtil.getDates(ano,mes,dia);

    db.tx( t => {
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
    .then( data =>  {
        const retorno={};
        retorno.total_ano=data[0].total || 0;
        retorno.total_mes=data[1].total|| 0;
        retorno.total_semana=data[2].total || 0;
        retorno.nao_aprovados=data[3].total|| 0;
        retorno.destaques=data[4]|| [];
        retorno.por_tipo=data[5] || [];
        res.status(200)
        .json(retorno);
    })
    .catch( error => {
        // error
        next(error);
    })
}

const teste = (req, res, next) => {
    const month=parseInt(req.params.month)-1;
    const day=parseInt(req.params.day);
    const year=parseInt(req.params.year);
    const date = (year+"-"+month+"-"+day);
    const retorno = {
    };
    db.tx( (t) => {   
        return t.oneOrNone("select count(*) as total_atendimentos from atendimento "
                          +"where extract(year from data)=extract(year from to_date($1, 'YYYY-MM-DD'))",date);
    })
    .then((data) => {
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