const Sequelize = require('sequelize');

const connection = new Sequelize('questions-guide', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;