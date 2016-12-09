var Sequelize = require('sequelize');
var db = require('../_db');
var status = require('./status');


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
    }
},{
    "freezeTableName": true,
    "underscored":true,
    "timestamps": false
});

valor.belongsTo(status,{foreignKey: 'status_id',foreignKeyConstraint: true});


module.exports = valor;