const user = require('../database').user;

function getAll() {
  return user
    .findAll({attributes: {exclude: ['password']}});
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
    .findOne({where: {id}, attributes: {exclude: ['password']}});
}

module.exports = {
  getAll,
  insert,
  findByEmail,
  findById
};