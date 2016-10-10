var express = require('express');
var router = express.Router();


var db = require('../queries/usuarioQuery');

router.all("*",function(req, res, next) {
  //console.log("optins "+req.headers);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.get('/api/usuarios', db.all);
router.get('/api/usuarios/:username', db.fetch);
router.post('/api/usuarios', db.create);

//router.put('/api/puppies/:id', db.updatePuppy);
//router.delete('/api/puppies/:id', db.removePuppy);








/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
