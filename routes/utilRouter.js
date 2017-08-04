const express = require('express');
const router = express.Router();
const utilQ = require('../queries/utilQ1');

//usuarios routers
router.get('/api/utils', utilQ.all);


module.exports = router;
