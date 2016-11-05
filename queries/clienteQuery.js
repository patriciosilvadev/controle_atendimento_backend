var db = require('../database/postgresqlDB');
/**
 * Pega todos os cliente
 */
function all(req, res, next) {
  db.any('select * from cliente')
    .then(function (data) {
      res.status(200)
        .json({
          status: true,
          data: data,
          message: 'Retornou todos os clientes!!!'
        });
    })
    .catch(function (err) {
      console.log("error "+err);
      return next(err);
    });
}
/**
 * Faz o fetch to cliente pelo CNPJ
 */
function fetchCNPJ(req, res, next) {
  var cnpj = parseInt(req.params.cnpj);
  db.one('select * from cliente where cnpj= $1', cnpj)
    .then(function (data) {
      res.status(200)
        .json(
          data);
    })
    .catch(function (err) {
      return next(err);
    });
}

function fetchNOME(req, res, next) {
  var nome = req.params.nome;
  db.one('select * from cliente where nome= $1', nome)
    .then(function (data) {
      res.status(200)
        .json({
          status: true,
          data: data,
          message: 'Achou cliente com nome '+nome
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
//insert usuarios
function create(req, res, next) {
  req.body.cnpj = parseInt(req.body.cnpj);
  db.none('insert into cliente(nome, cnpj)' +
      'values(${nome}, ${cnpj})',
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
    req.body.cnpj = parseInt(req.body.cnpj);
    db.none('update cliente set nome=${nome} where cnpj=${cnpj}',
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
  var cnpj = parseInt(req.params.cnpj);
  db.result('delete from cliente where cnpj = $1', cnpj)
    .then(function (result) {
      res.status(200)
        .json({
          status: true,
          message: `Removed ${result.rowCount} puppy`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  all: all,
  update:update,
  deleta:deleta,
  fetchCNPJ:fetchCNPJ,
  fetchNOME:fetchNOME,
  create:create
};