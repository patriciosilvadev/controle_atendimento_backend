var express = require('express');
var router = express.Router();
var db_faturamento = require('../queries/faturamentoQuery');


router.get('/api/faturamento', db_faturamento.all);

module.exports = router;