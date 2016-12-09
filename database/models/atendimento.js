var Sequelize = require('sequelize');
var db = require('../_db');

var cliente = require('./cliente');
var usuario = require('./usuario');
var valor = require('./valor');

var atendimento = db.define('atendimento', 
{
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    created_at: {
        type: Sequelize.DATE,
    },
    updated_at: {
        type: Sequelize.DATE,
    },
    finalizado_at: {
        type: Sequelize.DATE,
    },
    contato: {
        type: Sequelize.CHAR(45),
    },
    chamado: {
        type: Sequelize.BOOLEAN,
    },
    problema: {
        type: Sequelize.TEXT,
    },
    solucao: {
        type: Sequelize.TEXT,
    },
    tipo_acesso: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo_atendimento: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    aberto: {
        type: Sequelize.BOOLEAN
    }
},{
    "freezeTableName": true,
    "underscored":true,
    "timestamps": true
});

atendimento.belongsTo(cliente,{foreignKey: 'cliente_id',foreignKeyConstraint: true});
atendimento.belongsTo(valor,{foreignKey: 'valor_id',foreignKeyConstraint: true});
atendimento.belongsTo(usuario,{foreignKey: 'usuario_id',foreignKeyConstraint: true});


module.exports = atendimento;