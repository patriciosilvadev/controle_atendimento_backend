const express = require('express');
const router = express.Router();


const db_tipo = require('../queries/tipoAtendimentoQuery');


//usuarios routers
router.get('/api/tipoAtendimento', db_tipo.all);
/*router.post('/api/clientes', db_clientes.create);
router.get('/api/clientes/cnpj/:cnpj', db_clientes.fetchCNPJ);
router.get('/api/clientes/nome/:nome', db_clientes.fetchNOME);
router.put('/api/clientes/:cnpj', db_clientes.update);
router.delete('/api/clientes/:cnpj', db_clientes.deleta);*/


module.exports = router;
