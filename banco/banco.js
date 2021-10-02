const Sequelize = require('sequelize');

const connection = new Sequelize('banco','root','password',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;