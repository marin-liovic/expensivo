function getMe(req, res, next) {
  const {user} = req;
  res.json(user);
  next();
}

module.exports = {
  getMe
};
