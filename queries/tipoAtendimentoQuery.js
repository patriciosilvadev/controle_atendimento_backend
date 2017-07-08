var db = require('../database/postgresqlDB');
/**
 * Pega todos os tipos
 */
function all(req, res, next) {
  db.any('select * from tipo_atendimento')
    .then(function (data) {
      res.status(200)
        .json({
          status: true,
          data: data,
          message: 'Retornou todos os clientes!!!'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  all: all,
};