const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

function hash(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function doesMatch(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hash,
  doesMatch
};