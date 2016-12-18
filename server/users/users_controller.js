const userModel = require('./users_model');
const passwordManager = require('../utils/password_manager');
const handleError = require('../utils/error_handler').handleError;

function getUsers(req, res, next) {
  return userModel
    .getAll()
    .then((data) => {
      res.json(data);
      next();
    })
    .catch(handleError(res));
}

function postUsers(req, res, next) {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json('"email" or "password" field missing.');
  }
  return passwordManager.hash(password)
    .then(function(hash) {
      return userModel.insert({email, password: hash, role: 'user'})
    })
    .then(() => {
      res.sendStatus(201);
      next();
    })
    .catch(handleError(res));
}

function getUser(req, res, next) {
  const {user} = req;
  const {id} = req.params;
  return userModel
    .findById(id)
    .then((data) => {
      if (authorizeGetUser(data, user)) {
        res.json(data);
        next();
      } else {
        res.sendStatus(404);
      }
    })
    .catch(handleError(res));
}

function authorizeGetUser(data, user) {
  return data && (data.id === user.id || user.role === 'admin' || user.role === 'user_manager')
}

function deleteUser(req, res, next) {
  const {id} = req.params;
  return userModel
    .findById(id)
    .then((user) => {
      if (user) {
        return user
          .destroy()
          .then(() => {
            res.json(id);
            next();
          });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(handleError(res));
}

function putUser(req, res, next) {
  const {id} = req.params;
  const {email, role} = req.body;
  return userModel
    .findById(id)
    .then((user) => {
      if (user) {
        user.email = email;
        user.role = role;
        return user
          .save()
          .then(() => {
            res.json(id);
            next();
          });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(handleError(res));
}

module.exports = {
  getUsers,
  postUsers,
  getUser,
  deleteUser,
  putUser
};
