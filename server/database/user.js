const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const user = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    password: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: null
    }
  });

  return user;
};