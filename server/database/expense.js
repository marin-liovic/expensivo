const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const expense = sequelize.define('expense', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    timestamp: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    amount: {
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    comment: {
      type: Sequelize.STRING,
      defaultValue: null
    },
    owner: {
      type: Sequelize.INTEGER,
      defaultValue: null
    }
  });

  return expense;
};