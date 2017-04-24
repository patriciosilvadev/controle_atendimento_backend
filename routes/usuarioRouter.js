var express = require('express');
var router = express.Router();
var usuarioQ = require('../queries/usuarioQ');

var db_usuarios = require('../queries/usuarioQuery');

//usuarios routers
router.get('/api/usuarios', db_usuarios.all);
router.get('/api/usuarios/:id', usuarioQ.findByID);
router.post('/api/usuarios', db_usuarios.create);
router.put('/api/usuarios/:id', usuarioQ.update);
router.delete('/api/usuarios/:usuario_id', db_usuarios.deleta);
router.post('/login', usuarioQ.login);

module.exports = router;
