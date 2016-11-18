var express = require('express');
var router = express.Router();


var db_grafico = require('../queries/graficoFaturamentoQuery');


//usuarios routers

router.get('/api/graficoFaturamento/:mes/:dia/:ano', db_grafico.all);
//router.get('/api/graficoFaturamento/:month/:day/:year', db_grafico.teste);

module.exports = router;
