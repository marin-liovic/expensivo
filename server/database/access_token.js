const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const accessToken = sequelize.define('access_token', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    owner: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    value: {
      type: Sequelize.STRING,
      defaultValue: null
    }
  });

  return accessToken;
};