const user = require('./users_model');
const passwordManager = require('../utils/password_manager');

function getUsers(req, res, next) {
  return user
    .getAll()
    .then((data) => {
      res.json(data);
      next();
    })
}

function postUsers(req, res, next) {
  const {email, password} = req.body;
  return passwordManager.hash(password)
    .then(function(hash) {
      return user.insert({email, password: hash, role: 'user'})
    })
    .then(() => {
      res.sendStatus(201);
      next();
    })
    .catch((error) => {
      res.status(500).json(error && error.message);
    });
}

module.exports = {
  getUsers,
  postUsers
};
