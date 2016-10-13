var express = require('express');
var router = express.Router();


var db_usuarios = require('../queries/usuarioQuery');

//cors
router.all("*",function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//usuarios routers
router.get('/api/usuarios', db_usuarios.all);
router.get('/api/usuarios/:username', db_usuarios.fetch);
router.post('/api/usuarios', db_usuarios.create);
router.put('/api/usuarios', db_usuarios.update);
router.delete('/api/usuarios', db_usuarios.deleta);







/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
