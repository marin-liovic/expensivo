const crypto = require('crypto');
const RSVP = require('rsvp');
const passwordManager = require('../utils/password_manager');
const user = require('../users/users_model');
const accessToken = require('./access_token_model');
const handleError = require('../utils/error_handler').handleError;
const TOKEN_LENGTH = 16;

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
        value: crypto.randomBytes(TOKEN_LENGTH).toString('hex')
      })
        .then((data) => {
          res.status(201).json(data.value);
          next();
        });
    })
    .catch(handleError(res));
}

module.exports = {
  postAccessToken
};