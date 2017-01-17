var sequelize = require('sequelize');
var debug = require('debug')('myapp:db:sequelize');

var config = {
  "username": "redhat",
  "password": "redhat",
  "database": "atendimento_db",
  "host": process.env.db_url || 'localhost',
  "dialect": "postgres",
  "pool": {
    "max": 10,
    "min": 5
  },
  "freezeTableName": true,
  "underscored":true,
  "timestamps": false,
  "omitNull": true,
  "logging": debug
}

var db = new sequelize(config.database, config.username, config.password, config);

db
.authenticate()
.then(function(err) {
    debug("Connecting  to database with the following config: \n %j",config)
})
.catch(function (err) {
    debug("Error connecting  to database with the following config: \n %j",config)
    debug('Error: %s', err);
});

module.exports = db;