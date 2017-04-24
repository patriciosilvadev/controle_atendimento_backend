var express = require('express');
var router = express.Router();
var db_clientes = require('../queries/clienteQuery');
var clienteQ = require('../queries/clienteQ');


//usuarios routers
router.get('/api/clientes', db_clientes.all);
router.post('/api/clientes', db_clientes.create);
router.get('/api/clientes/:cnpj', clienteQ.findByID);
router.get('/api/clientes/nome/:nome', db_clientes.fetchNOME);
router.put('/api/clientes/:cnpj', db_clientes.update);
router.delete('/api/clientes/:cnpj', db_clientes.deleta);


module.exports = router;
