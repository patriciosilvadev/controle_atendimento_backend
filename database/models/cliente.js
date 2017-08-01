const Sequelize = require('sequelize');
const db = require('../_db');

const cliente = db.define('cliente', 
{
    cnpj: {
        type: Sequelize.CHAR(20),
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    "freezeTableName": true,
    "underscored":true,
    "timestamps": false
});

module.exports = cliente;