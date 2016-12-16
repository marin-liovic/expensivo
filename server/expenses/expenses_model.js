const expense = require('../database').expense;

function insert(data) {
  return expense
    .create(data);
}

function getAll(options) {
  return expense
    .findAll(options);
}

function deleteById(id) {
  return expense
    .destroy({where: {id}});
}

module.exports = {
  insert,
  getAll,
  deleteById
};