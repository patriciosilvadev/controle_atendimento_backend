var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = {
    //host: '192.168.0.50',
    host:process.env.db_url,
    port: 5432,
    database: 'atendimento_db',
    user: 'redhat',
    password: 'redhat'
};
var db = pgp(connectionString);


//insert usuarios
function create(req, res, next) {
  db.none('insert into sobrenome(sobrenome)' +
      'values("teste")')
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserio usuario com sucesso!!'
        });
    })
    .catch(function (err) {
       res.status(200)
        .json({
          status: 'success',
          message: 'Inserio usuario com sucesso!!',
          data:err
        });
      //return next(err);
    });
}


//insert usuarios
function getAll(req, res, next) {



}



module.exports = {
  create:create,
  getAll:getAll
}