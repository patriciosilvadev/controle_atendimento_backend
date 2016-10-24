var express = require('express');
var router = express.Router();


var db_grafico = require('../queries/graficoQuery');


//usuarios routers

router.get('/api/grafico/:ano/:mes', db_grafico.all);


module.exports = router;
