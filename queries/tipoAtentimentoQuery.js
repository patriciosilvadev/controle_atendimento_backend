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
//insert usuarios
function create(req, res, next) {
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
function update(req, res, next) {
  /*db.none('update usuario set nome=$1, email=$2, username=$3, password=$4, tipo=$5 where id=$6',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])*/
    req.params.usuario_id=parseInt(req.params.usuario_id);
    db.none('update usuario set nome=${nome}, email=${email}, username=${username}, password=${password}, tipo=${tipo} where id=${usuario_id}',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Atualizado com sucesso'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleta(req, res, next) {
  var usuario_id = parseInt(req.params.usuario_id);
  db.result('delete from usuario where usuario_id = $1', usuario_id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
  all: getTodosUsuarios,
  fetch:getUsuarioPorUsername,
  create:create, 
  update:update,
  deleta:deleta
};