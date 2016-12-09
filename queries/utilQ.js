var db = require('../database/postgresqlDB');

utilQ = {};

utilQ.all =  function(req, res, next) {

  db.tx(function(t) {   
        return t.batch([
            t.any("select * from tipo_acesso "),
            t.any("select * from tipo_atendimento"),
            t.any("select * from status")
        ]);
    })
    .then(function(data) {
        var retorno={};
        retorno.tipo_acesso=data[0] || [];
        retorno.tipo_atendimento=data[1] || [];
        retorno.status=data[2] || [];
        console.log(data);
        res.status(200)
        .json(retorno);
    })
    .catch(function(error) {
        // error
        next(error);
    })
}

module.exports=utilQ;