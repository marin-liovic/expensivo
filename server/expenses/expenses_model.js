const expense = require('../database').expense;

function insert(data) {
  return expense
    .create(data);
}

function getAll(options={}) {
  options.order = [['timestamp', 'DESC']];
  return expense
    .findAll(options);
}

function getAllForUser(owner, options={}) {
  const {date_from, date_to} = options;
  const where = {owner};
  if (date_from && date_to) {
    where.timestamp = {
      $between: [date_from, date_to]
    }
  }
  return getAll({where});
}

function findById(id) {
  return expense
    .findOne({where: {id}});
}

module.exports = {
  insert,
  getAll,
  getAllForUser,
  findById
};