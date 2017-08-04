const express = require('express');
const router = express.Router();


const db_grafico = require('../queries/graficoQuery');


//usuarios routers

router.get('/api/grafico/:ano/:mes/:dia', db_grafico.all);
router.get('/api/graficoTeste/:month/:day/:year', db_grafico.teste);

module.exports = router;
