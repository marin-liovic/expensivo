const expense = require('../database').expense;

function insert(data) {
  return expense
    .create(data);
}

function getAll(options) {
  return expense
    .findAll(options);
}

function getAllForUser(owner) {
  return getAll({
    where: {owner}
  });
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