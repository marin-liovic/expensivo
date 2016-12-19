const crypto = require('crypto');
const RSVP = require('rsvp');
const passwordManager = require('../utils/password_manager');
const user = require('../users/users_model');
const accessToken = require('./access_token_model');
const handleError = require('../utils/error_handler').handleError;
const TOKEN_LENGTH = 16;
const TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

function postAccessToken(req, res, next) {
  const {email, password} = req.body;
  return user
    .findByEmail(email)
    .then((user) => {
      if (!user) {
        return {doesMatch: false};
      }
      return RSVP.hash({
        user,
        doesMatch: passwordManager.doesMatch(password, user.password)
      });
    })
    .then((hash) => {
      if (!hash.doesMatch) {
        return res.sendStatus(401);
      }
      return accessToken.insert({
        owner: hash.user.id,
        value: crypto.randomBytes(TOKEN_LENGTH).toString('hex'),
        expires: calculateExpiration()
      })
        .then((data) => {
          res.status(201).json(data.value);
          next();
        });
    })
    .catch(handleError(res));
}

function deleteAccessToken(req, res, next) {
  const {value} = req.params;
  const {user} = req;
  return accessToken
    .findByValue(value)
    .then((token) => {
      if (token && token.owner === user.id) {
        return token
          .destroy()
          .then(() => {
            res.json(value);
            next();
          });
      } else {
        res.sendStatus(404);
      }
    })
    .catch(handleError(res));
}

function calculateExpiration() {
  return new Date(new Date().getTime() + TOKEN_EXPIRATION_MS);
}

module.exports = {
  postAccessToken,
  deleteAccessToken
};