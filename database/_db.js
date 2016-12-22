var sequelize = require('sequelize');

var config = {
  "username": "redhat",
  "password": "redhat",
  "database": "atendimento_db",
  "host": "192.168.0.50",
  "dialect": "postgres",
  "pool": {
    "max": 10,
    "min": 5
  },
  "freezeTableName": true,
  "underscored":true,
  "timestamps": false,
  "omitNull": true,
  "logging": true
}

var db = new sequelize(config.database, config.username, config.password, config);

db
    .authenticate()
    .then(function(err) {
        console.log('Connection with database '+config.database+' has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = db;