var express = require('express');
var router = express.Router();
var db_atendimento = require('../queries/atendimentoQuery');


//router.post('/api/atendimentos', db_atendimento.create);
router.post('/api/atendimentos', db_atendimento.insert);

module.exports = router;