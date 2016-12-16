const user = require('../database').user;

function getAll() {
  return user
    .findAll();
}

function insert(data) {
  return user
    .create(data);
}

function findByEmail(email) {
  return user
    .findOne({where: {email}});
}

function findById(id) {
  return user
    .findOne({where: {id}});
}

module.exports = {
  getAll,
  insert,
  findByEmail,
  findById
};