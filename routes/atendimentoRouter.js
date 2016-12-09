var express = require('express');
var router = express.Router();
var db_atendimento = require('../queries/atendimentoQuery');
var atendimentoQ = require('../queries/atendimentoQ');


router.post('/api/atendimentos', atendimentoQ.insert);
router.get('/api/atendimentos', db_atendimento.all);
router.get('/api/atendimentos/:ano/:mes', atendimentoQ.allAnoMes);
router.get('/api/atendimento/:ano/:mes', db_atendimento.allByMonth);
router.put('/api/atendimentos/finalizar/:atendimento_id', db_atendimento.finalizar);
router.put('/api/atendimentos/:atendimento_id', db_atendimento.update);

module.exports = router;