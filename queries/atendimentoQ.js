var cliente = require('../database/models/cliente');
var valor = require('../database/models/valor');
var usuario = require('../database/models/usuario');
var atendimento = require('../database/models/atendimento');
var tipoAtendimento = require('../database/models/tipo_atendimento');
var db = require('../database/_db');
var dot = require('dot-object');
var StringMask = require('string-mask');


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
    var dtFinal= new Date(ano,dtInicial.getMonth()+1,1);

    var filter = {};
    filter.include= [ valor , cliente, usuario, tipoAtendimento]
    filter.raw= true;
    filter.order= [['created_at', 'DESC'],['created_at', 'DESC']]
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


/*# GET #*/
function allByClient(req, res, next){
	var id=applyMask(req.params.id);

    var filter = {};
    filter.include= [ valor , cliente, usuario, tipoAtendimento]
    filter.raw= true;
    filter.order= [['created_at', 'DESC'],['created_at', 'DESC']]
    filter.where={
        cliente_id: id
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
            if(req.body.aberto==false && at.aberto!==false){
                var dateFinalizado = new Date();
                req.body.aberto=false;
                req.body.finalizado_at=dateFinalizado;
            }else{
                req.body.finalizado_at=at.finalizado_at;
            }
            return at.updateAttributes(req.body,{omitNull: true,transaction: t});
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

        return cliente.findOrCreate({
            where: {
                cnpj: req.body.cliente.cnpj,
                nome: req.body.cliente.nome
            }
        , transaction: t})
        .then(c=>{
            console.log(c);
            var item = {
                    "contato": req.body.contato,
                    "chamado": req.body.chamado,
                    "tipo_acesso_id": req.body.tipo_acesso_id,
                    "tipo_atendimento_id": req.body.tipo_atendimento_id,
                    "usuario_id": req.body.usuario_id,
                    "cliente_id": req.body.cliente.cnpj,
                    "aberto": req.body.aberto,
                    "finalizado_at": req.body.finalizado_at,
                    "problema": req.body.problema,
                    "solucao": req.body.solucao,
                    aberto: true
            };

            if(req.body.finalizado!==undefined && req.body.finalizado){
                var dateFinalizado = new Date();
                item.aberto=false;
                item.finalizado_at=dateFinalizado;
            }else{
                item.aberto=true;
            }
            return tipoAtendimento.findById(item.tipo_atendimento_id,{transaction:t}).then(data=>{
                                console.log(data);
                                var options ={};
                                options.transaction= t;
                                if(data.descricao=="AVULSO ONLINE" || data.descricao=="AVULSO LOCAL"){
                                        item.valor= req.body.valor;
                                        options.include= [ valor ];
                                }
                                return atendimento.create(item,options);
                            });
        });
    }).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        next(err);
    });

}

function getById(req, res, next){

    atendimento
    .findById(req.params.id)
    .then(function(at) {
        res.json(at || {});
     }).catch(function(err){
		next(err);
	});

}

/**
 * Pega Numero
 */
function getNumber(str){
    if(str===undefined){
        str="";
    }
    return str.replace(/[^\d]/g, '').slice(0, 14)
}

/**
 * Aplica Mascara
 */
function applyMask(str){
    var number = getNumber(str);
    var cnpj = new StringMask('00.000.000\/0000-00');
    var cpf = new StringMask('000.000.000-00');
    var mascara ="";
    if(number.length>11){
        mascara = cnpj.apply(number);
    }else{
        mascara = cpf.apply(number);
    }
    return mascara.trim().replace('/[^0-9]$/', '');
}



module.exports = {
    insert:insert,
    all:all,
    getById:getById,
    update:update,
    allAnoMes:allAnoMes,
    allByClient:allByClient
};