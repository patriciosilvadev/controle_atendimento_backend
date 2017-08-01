const Sequelize = require('sequelize');
const db = require('../_db');

const cliente = require('./cliente');
const usuario = require('./usuario');
const valor = require('./valor');
const tipo_atendimento = require('./tipo_atendimento');
const tipo_acesso = require('./tipo_acesso');

const atendimento = db.define('atendimento', 
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
        allowNull: false
    },
    problema: {
        type: Sequelize.TEXT,
    },
    solucao: {
        type: Sequelize.TEXT,
    },
    aberto: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},{
    "freezeTableName": true,
    "underscored":true,
    "timestamps": true
});

atendimento.belongsTo(cliente,{foreignKey: 'cliente_id',foreignKeyConstraint: true});
atendimento.belongsTo(tipo_acesso,{foreignKey: 'tipo_acesso_id',foreignKeyConstraint: true});
atendimento.belongsTo(tipo_atendimento,{foreignKey: 'tipo_atendimento_id',foreignKeyConstraint: true});
atendimento.belongsTo(valor,{foreignKey: 'valor_id',foreignKeyConstraint: true});
atendimento.belongsTo(usuario,{foreignKey: 'usuario_id',foreignKeyConstraint: true});


module.exports = atendimento;