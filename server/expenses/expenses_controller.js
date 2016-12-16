const expense = require('./expenses_model');

function postExpenses(req, res, next) {
  const {timestamp, description, amount, comment} = req.body;
  return expense
    .insert({timestamp, description, amount, comment, owner: '123'})
    .then(() => {
      res.sendStatus(201);
      next();
    });
}

function getExpenses(req, res, next) {
  return expense
    .getAll()
    .then((data) => {
      res.json(data);
      next();
    });
}

function deleteExpense(req, res, next) {
  const {id} = req.params;
  return expense
    .deleteById(id)
    .then((nDeleted) => {
      if (nDeleted) {
        res.json(id);
        next();
      } else {
        res.sendStatus(404);
      }
    });
}

module.exports = {
  postExpenses,
  getExpenses,
  deleteExpense
};