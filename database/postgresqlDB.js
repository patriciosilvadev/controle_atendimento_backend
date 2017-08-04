/**
 * Connection Pool para o PostgreSQL
 */
const promise = require('bluebird');
const debug = require('debug')('myapp:db:postgres');


const options = {
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
if(process.env.NODE_ENV=='dev'){
    const monitor = require('pg-monitor');

    monitor.attach(options); // attach to all query events;
    // See API: https://github.com/vitaly-t/pg-monitor#attachoptions-events-override

    monitor.setTheme('matrix'); // change the default theme;
    // Other themes: https://github.com/vitaly-t/pg-monitor/wiki/Color-Themes

    monitor.log = debug;/*function (msg, info) {
        // save the screen messages into your own log file;
    };*/
}

const connectionString = {
    host:process.env.db_url || 'localhost',//'191.182.25.177',
    port: 5432,
    database: 'atendimento_db',
    user: process.env.DB_USERNAME || 'redhat',
    password: process.env.DB_PASSWORD || 'redhat'
};
const db = pgp(connectionString);

module.exports=db;