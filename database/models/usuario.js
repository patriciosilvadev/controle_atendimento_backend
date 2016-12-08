var Sequelize = require('sequelize');
var db = require('../_db');

var usuario = db.define('usuario', 
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
    password: {
        type: Sequelize.CHAR(35),
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