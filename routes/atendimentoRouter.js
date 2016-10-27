var express = require('express');
var router = express.Router();
var db_atendimento = require('../queries/atendimentoQuery');


//router.post('/api/atendimentos', db_atendimento.create);
router.post('/api/atendimentos', db_atendimento.insert);
router.get('/api/atendimentos/:usuario_id', db_atendimento.all);

module.exports = router;