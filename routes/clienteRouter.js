var express = require('express');
var router = express.Router();


var db_clientes = require('../queries/clienteQuery');


//usuarios routers
router.get('/api/clientes', db_clientes.all);
router.post('/api/clientes', db_clientes.create);
router.get('/api/usuarios/cnpj/:cnpj', db_usuarios.fetchCNPJ);
router.get('/api/usuarios/nome/:nome', db_usuarios.fetchNOME);
//router.post('/api/usuarios', db_usuarios.create);
//router.put('/api/usuarios', db_usuarios.update);
//router.delete('/api/usuarios', db_usuarios.deleta);


module.exports = router;
