var express = require('express');
var router = express.Router();
var utilQ = require('../queries/utilQ1');

//usuarios routers
router.get('/api/utils', utilQ.all);


module.exports = router;
