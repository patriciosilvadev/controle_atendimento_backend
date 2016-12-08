var sequelize = require('sequelize');
var promise = require('bluebird');

var options = {
  promiseLib: promise
};


var monitor = require('pg-monitor');

monitor.attach(options); // attach to all query events;
// See API: https://github.com/vitaly-t/pg-monitor#attachoptions-events-override

monitor.setTheme('matrix'); // change the default theme;
// Other themes: https://github.com/vitaly-t/pg-monitor/wiki/Color-Themes

monitor.log = function (msg, info) {
    // save the screen messages into your own log file;
};


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