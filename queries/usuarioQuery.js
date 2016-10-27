var db = require('../database/postgresqlDB');
var config = require('../config'); 
var jwt    = require('jsonwebtoken');

// add query functions
function getTodosUsuarios(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
  console.log("get "+req.headers);
  db.any('select * from usuario')
    .then(function (data) {
      res.status(200)
        .json({
          status: true,
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
          status: true,
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
          status: true,
          message: 'Inserio usuario com sucesso!!'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function update(req, res, next) {
    var usuario_id = parseInt(req.params.usuario_id);
    req.body.usuario_id=usuario_id;
    db.none('update usuario set nome=${nome}, email=${email}, username=${username}, password=${password}, tipo=${tipo} where usuario_id=${usuario_id}',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: true,
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
          status: true,
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}
/**
 * Endpoint usado pelo servico da aplicacao
 */
function login(req,res,next){
   console.log(req.body);
   db.one('select username, email,tipo, nome,usuario_id '
   +'from usuario where username=${username} AND password=${password}',req.body)
  .then(function (user) {
    console.log(user);
    user.token = jwt.sign(user, config.secret , {
        expiresIn : 60*60*24 // expires in 24 hours
    });
    res.status(200)
      .json(user);
  })
  .catch(function (err) {
      res.status(403).json(err);
  });
}

module.exports = {
  all: getTodosUsuarios,
  fetch:getUsuarioPorUsername,
  create:create, 
  update:update,
  deleta:deleta,
  login:login
};