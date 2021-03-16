const Sequelize = require('sequelize');
const connection = require('../database');

const answer = connection.define('answers', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    question_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }    
});
answer.sync({force: false}).then(() => {});

module.exports = answer