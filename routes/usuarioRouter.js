var express = require('express');
var router = express.Router();


var db_usuarios = require('../queries/usuarioQuery');

//usuarios routers
router.get('/api/usuarios', db_usuarios.all);
router.get('/api/usuarios/:username', db_usuarios.fetch);
router.post('/api/usuarios', db_usuarios.create);
router.put('/api/usuarios/:usuario_id', db_usuarios.update);
router.delete('/api/usuarios/:usuario_id', db_usuarios.deleta);
router.post('/login', db_usuarios.login);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
