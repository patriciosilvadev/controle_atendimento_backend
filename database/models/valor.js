var Sequelize = require('sequelize');
var db = require('../_db');

var valor = db.define('valor', 
{
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    motivo: {
        type: Sequelize.TEXT,
    },
    faturado_at: {
        type: Sequelize.DATE,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    "freezeTableName": true,
    "underscored":true,
    "timestamps": false
});

module.exports = valor;