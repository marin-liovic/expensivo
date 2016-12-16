const accessToken = require('../auth/access_token_model');
const user = require('../users/users_model');

function authorize(roles = []) {
  return function (req, res, next) {
    const {scheme, credentials} = req.authorization;
    if (scheme !== 'Bearer' || !credentials) {
      return res.sendStatus(401);
    }
    accessToken
      .findByValue(credentials)
      .then((token) => {
        if (token) {
          return user
            .findById(token.owner)
            .then((user) => {
              if (roles.length !== 0 && !roles.includes(user.role)) {
                res.sendStatus(403);
              } else {
                req.user = user;
                next();
              }
            });
        } else {
          return res.sendStatus(401);
        }
      })
  }
}

module.exports = {
  authorize
};
