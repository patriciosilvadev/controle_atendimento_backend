/**
 * Connection Pool para o PostgreSQL
 */
var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV=='dev'){
    var monitor = require('pg-monitor');

    monitor.attach(options); // attach to all query events;
    // See API: https://github.com/vitaly-t/pg-monitor#attachoptions-events-override

    monitor.setTheme('matrix'); // change the default theme;
    // Other themes: https://github.com/vitaly-t/pg-monitor/wiki/Color-Themes

    monitor.log = function (msg, info) {
        // save the screen messages into your own log file;
    };
}
console.log(process.env.db_url);
var connectionString = {
    host:process.env.db_url || '192.168.0.50',
    port: 5432,
    database: 'atendimento_db',
    user: 'redhat',
    password: 'redhat'
};
var db = pgp(connectionString);

module.exports=db;