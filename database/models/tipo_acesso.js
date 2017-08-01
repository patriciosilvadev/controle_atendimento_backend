const Sequelize = require('sequelize');
const db = require('../_db');

const tipo_acesso = db.define('tipo_acesso', 
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

module.exports = tipo_acesso;