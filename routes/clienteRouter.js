const express = require('express');
const router = express.Router();
const db_clientes = require('../queries/clienteQuery');
const clienteQ = require('../queries/clienteQ');


router.get('/api/clientes', clienteQ.all);
router.post('/api/clientes', clienteQ.insert);
router.get('/api/clientes/:cnpj', clienteQ.findByCNPJ);
router.get('/api/clientes/nome/:nome', db_clientes.fetchNOME);
router.put('/api/clientes/:cnpj', db_clientes.update);
router.delete('/api/clientes/:cnpj', db_clientes.deleteByCNPJ);


module.exports = router;
