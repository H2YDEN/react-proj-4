require('dotenv').config({ path: '../.env' });
const Sequelize = require('sequelize');
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres"
});

module.exports = { sequelize };