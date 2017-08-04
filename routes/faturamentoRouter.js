const express = require('express');
const router = express.Router();
//const db_faturamento = require('../queries/faturamentoQuery');
const faturamentoQ = require('../queries/faturamentoQ');




router.get('/api/faturamento/:ano/:mes', faturamentoQ.allAnoMes);
router.put('/api/faturamento/:id', faturamentoQ.faturar);

module.exports = router;