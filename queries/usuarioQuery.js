var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'atendimento_db',
    user: 'redhat',
    password: 'redhat'
};
var db = pgp(connectionString);

// add query functions
function getTodosUsuarios(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log("get "+req.headers);
  db.any('select * from usuario')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou todos os usuarios!!!'
        });
     // next();
    })
    .catch(function (err) {
      console.log("error "+err);
      return next(err);
    });
}
//get usuario por username
function getUsuarioPorUsername(req, res, next) {
  var username = req.params.username;
  db.one('select * from usuario where username= $1', username)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Achou username '+username
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function create(req, res, next) {
  //req.body.age = parseInt(req.body.age);
  //console.log(req.body);
  //console.log(req.data);
  //console.log(req.nome);
  db.none('insert into usuario(nome, email, username, password, tipo)' +
      'values(${nome}, ${email}, ${username}, ${password},${tipo})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserio usuario com sucesso!!'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  all: getTodosUsuarios,
  fetch:getUsuarioPorUsername,
  create:create  
  /*getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy*/
};