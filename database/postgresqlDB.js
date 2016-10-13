/**
 * Connection Pool para o PostgreSQL
 */
var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = {
    host:process.env.db_url | '192.168.0.50',
    port: 5432,
    database: 'atendimento_db',
    user: 'redhat',
    password: 'redhat'
};
var db = pgp(connectionString);

module.exports=db;