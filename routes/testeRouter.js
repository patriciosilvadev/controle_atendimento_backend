var express = require('express');
var router = express.Router();


var testeQuery = require('../queries/testeQuery');

router.get('/api/test',testeQuery.getAll);
router.post('/api/test', testeQuery.create);



module.exports = router;
