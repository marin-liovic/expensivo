const userModel = require('./users_model');
const passwordManager = require('../utils/password_manager');

function getUsers(req, res, next) {
  return userModel
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
      return userModel.insert({email, password: hash, role: 'user'})
    })
    .then(() => {
      res.sendStatus(201);
      next();
    })
    .catch((error) => {
      res.status(500).json(error && error.message);
    });
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
    });
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
    });
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
    });
}

module.exports = {
  getUsers,
  postUsers,
  getUser,
  deleteUser,
  putUser
};
