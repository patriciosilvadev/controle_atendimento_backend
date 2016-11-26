var express = require('express');
var router = express.Router();
var db_faturamento = require('../queries/faturamentoQuery');


router.get('/api/faturamento/:ano/:mes', db_faturamento.all);
router.put('/api/faturamento/:id/faturar', db_faturamento.faturar);

module.exports = router;