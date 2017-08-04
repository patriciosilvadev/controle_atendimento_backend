const db = require('../database/postgresqlDB');
/**
 * Pega todos os cliente
 */
function all(req, res, next) {
  db.any('select * from cliente')
    .then(function (data) {
      res.status(200)
        .json(data);
    })
    .catch( err => {
      console.error("error "+err);
      return next(err);
    });
}
/**
 * Faz o fetch to cliente pelo CNPJ
 */
const fetchCNPJ = (req, res, next) =>{
  const cnpj = req.params.cnpj;
  db.oneOrNone('select * from cliente where cnpj=$1', cnpj)
    .then(function (data) {
      res.status(200)
        .json(
          data);
    })
    .catch( err => {
      return next(err);
    });
}

const fetchNOME = (req, res, next)  => {
  const nome = req.params.nome;
  db.one('select * from cliente where nome= $1', nome)
    .then(function (data) {
      res.status(200)
        .json({
          status: true,
          data: data,
          message: 'Achou cliente com nome '+nome
        });
    })
    .catch( err => {
      return next(err);
    });
}
//insert usuarios
const create = (req, res, next) => {
  req.body.cnpj = parseInt(req.body.cnpj);
  
  db.none('insert into cliente(nome, cnpj)' +
      'values(${nome}, ${cnpj})',
    req.body)
    .then( () => {
      res.status(200)
        .json({
          status: true,
          message: 'Inserio usuario com sucesso!!'
        });
    })
    .catch( err =>  {
      return next(err);
    });
}
const update = (req, res, next) => {
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
    .catch( err => {
      return next(err);
    });
}

const deleteByCNPJ = (req, res, next) => {
  const cnpj = parseInt(req.params.cnpj);
  db.result('delete from cliente where cnpj = $1', cnpj)
    .then(function (result) {
      res.status(200)
        .json({
          status: true,
          message: `Removed ${result.rowCount} puppy`
        });
    })
    .catch( err => {
      return next(err);
    });
}

module.exports = {
  all: all,
  update:update,
  deleteByCNPJ:deleteByCNPJ,
  fetchCNPJ:fetchCNPJ,
  fetchNOME:fetchNOME,
  create:create
};