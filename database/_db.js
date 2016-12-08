var sequelize = require('sequelize');

var config = {
  "username": "redhat",
  "password": "redhat",
  "database": "atendimento_db",
  "host": "127.0.0.1",
  "dialect": "postgres",
  "freezeTableName": true,
  "underscored":true,
  "timestamps": false,
  "logging": true
}

var db = new sequelize(config.database, config.username, config.password, config);

db
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = db;