var cliente = require('../database/models/cliente');
var valor = require('../database/models/valor');
var usuario = require('../database/models/usuario');
var atendimento = require('../database/models/atendimento');
var db = require('../database/_db');
var dot = require('dot-object');

/*# GET #*/
function all(req, res, next){

     atendimento.findAll({include: [ valor ]}).then(function(atendimentos) {
        res.json(atendimentos);
     }).catch(function(err){
		next(err);
	});

}

/*# GET #*/
function allAnoMes(req, res, next){
	var mes=parseInt(req.params.mes);
    var ano=parseInt(req.params.ano);

    var dtInicial= new Date(ano,mes,1);
    var dtFinal= new Date(ano,dtInicial.getMonth()+1,0);;

    var filter = {};
    filter.include= [ valor , cliente, usuario]
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

/*# PUT #*/
function update(req, res, next){

    db.transaction(function (t) { 
        return atendimento
        .find({
            include: [ valor ],
            where: {
                id: req.params.id
            }
        }, {transaction: t})
        .then(at=>{
            if(at){
                if(at.valor){
                    at.valor
                    .updateAttributes(req.body.valor,{transaction: t})
                    .then(()=>{ return at});
                }
                return at;
            }else{
                throw new Error();
            }
        })
        .then(at=>{
            return at.updateAttributes(req.body,{transaction: t});
        });

    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        next(err);
    });

}


/*# POST #*/
function insert(req, res, next){

    db.transaction(function (t) { 
        return cliente.find({
            where: {
                cnpj: req.body.cnpj
            }
        }, {transaction: t})
        .then(c=>{
            if(c!==null && c.cnpj != undefined ){
                return c;
            }else{
                return cliente.create(req.body,{transaction: t});
            }
        })
        .then(c=>{
            if(req.body.tipo==0){
                return atendimento.create({
                    "contato": req.body.contato,
                    "chamado": req.body.chamado,
                    "tipo": req.body.tipo,
                    "usuario_id": req.body.usuario_id,
                    "cliente_id": c.cnpj,
                    "aberto": req.body.aberto,
                    "finalizado_at": req.body.finalizado_at,
                    "problema": req.body.problema,
                    "solucao": req.body.solucao,
                    "valor": req.body.valor,
                },
                {
                    include: [ valor ]
                }
                ,{transaction: t});
            }else{
                return atendimento.create(req.body,{transaction: t});
            }
        });

    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        next(err);
    });

}


module.exports = {
    insert:insert,
    all:all,
    update:update,
    allAnoMes:allAnoMes
};