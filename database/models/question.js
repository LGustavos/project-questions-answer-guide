const Sequelize = require('sequelize');
const connection = require('../database');

const question = connection.define('questions', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
question.sync({force: false})

module.exports = question