const accessToken = require('../database').accessToken;

function insert(data) {
  return accessToken
    .create(data);
}

function findByValue(value) {
  return accessToken
    .findOne({where: {value}});
}

module.exports = {
  insert,
  findByValue
};