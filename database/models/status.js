const Sequelize = require('sequelize');
const db = require('../_db');

const status = db.define('status', 
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