var Sequelize = require('sequelize');
var db = require('../_db');

var status = db.define('status', 
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.CHAR(45),
    }
},{
    "freezeTableName": true,
    "underscored":true,
    "timestamps": false
});

module.exports = status;