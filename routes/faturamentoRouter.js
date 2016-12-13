var express = require('express');
var router = express.Router();
var db_faturamento = require('../queries/faturamentoQuery');
var faturamentoQ = require('../queries/faturamentoQ');




router.get('/api/faturamento/:ano/:mes', faturamentoQ.allAnoMes);
router.put('/api/faturamento/:id/faturar', db_faturamento.faturar);

module.exports = router;