const Sequelize = require('sequelize');
const config = require('../../config/database.json');
const user = require('./user');
const accessToken = require('./access_token');
const expense = require('./expense');

const sequelize = new Sequelize(
  config.schema,
  config.username,
  config.password,
  config.options
);

module.exports = {
  user: user(sequelize),
  accessToken: accessToken(sequelize),
  expense: expense(sequelize)
};