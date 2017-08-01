const Sequelize = require('sequelize');
const db = require('../_db');

const usuario = db.define('usuario', 
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.CHAR(45),
        allowNull: false
    },
    password: {
        type: Sequelize.CHAR(32),
        allowNull: false
    },
    tipo: {
        type: Sequelize.CHAR(25),
        allowNull: false
    }
},{
    "freezeTableName": true,
    "underscored":true,
    "timestamps": false
});



module.exports = usuario;