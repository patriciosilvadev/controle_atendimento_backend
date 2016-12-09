var Sequelize = require('sequelize');
var db = require('../_db');

var tipo_atendimento = db.define('tipo_atendimento', 
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

module.exports = tipo_atendimento;