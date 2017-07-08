'use strict';
var db = require('../database/postgresqlDB');
module.exports=function(io){
    io.on('connection', function (socket) {
        var retorno = {};
        db.tx(function(t) {   
            var req ={
                ano:'2016',
                mes:'10'
            };
            return t.oneOrNone("select count(*) as total_atendimentos from atendimento "
                            +"where extract(year from data_inicio)=${ano}",req)
            .then(data=>{
                retorno.atendimentoAno=parseInt(data.total_atendimentos);
                return t.oneOrNone("select count(*) as total_mes from atendimento "
                            +"where extract(year from data_inicio)=${ano} "
                            +"AND extract(MONTH from data_inicio)=${mes}",req);
            })
            .then(data=>{
                retorno.atendimentoMes=parseInt(data.total_mes);
                return t.any("select count(*) as total, "
                +"(select nome from usuario where usuario.usuario_id=atendimento.usuario_id) "
                +"from atendimento  where extract(year from data_inicio)=${ano} "
                +"AND extract(MONTH from data_inicio)=${mes} "
                +"GROUP BY usuario_id  ORDER BY total DESC",req);
            })
            .then(data=>{
                retorno.destaques=data;
                return t.any("select count(*) as total, "
                +"(select descricao from tipo_atendimento where tipo_atendimento.tipo_atendimento_id=atendimento.tipo_atendimento_id) "
                +"from atendimento  where extract(year from data_inicio)=${ano} "
                +"AND extract(MONTH from data_inicio)=${mes} "
                +"GROUP BY descricao  ORDER BY total DESC",req);
            });
        })
        .then(function(data) {
            retorno.porTipo=data;
            setInterval(function(){
                socket.emit('chartUpdate', retorno);
            },2000);
        })
        .catch(function(error) {
            // error
            socket.emit('chartUpdate',  JSON.stringify(error));
        });
        socket.on('my other event', function (data) {
        });
    });
};