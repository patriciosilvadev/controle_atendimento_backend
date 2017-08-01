const express = require('express');
const router = express.Router();


const db_grafico = require('../queries/graficoFaturamentoQuery');


//usuarios routers

router.get('/api/graficoFaturamento/:ano/:mes/:dia', db_grafico.all);
//router.get('/api/graficoFaturamento/:month/:day/:year', db_grafico.teste);

module.exports = router;
