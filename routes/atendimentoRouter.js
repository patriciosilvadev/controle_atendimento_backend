const express = require('express');
const router = express.Router();
//const db_atendimento = require('../queries/atendimentoQuery');
const atendimentoQ = require('../queries/atendimentoQ');


router.post('/api/atendimentos', atendimentoQ.insert);
router.get('/api/atendimentos', atendimentoQ.all);
router.get('/api/atendimentos/:id', atendimentoQ.getById);
router.get('/api/atendimentos/:ano/:mes', atendimentoQ.allAnoMes);
//router.get('/api/atendimento/:ano/:mes', db_atendimento.allByMonth);
//router.put('/api/atendimentos/finalizar/:atendimento_id', db_atendimento.finalizar);
router.put('/api/atendimentos/:id', atendimentoQ.update);
router.get('/api/atendimento/cliente/:id',atendimentoQ.allByClient);

module.exports = router;