const expenseModel = require('./expenses_model');

function postExpenses(req, res, next) {
  const {user} = req;
  const {timestamp, description, amount, comment} = req.body;
  if (!timestamp || !Date.parse(timestamp) || !description || !amount) {
    return res.status(400).json('"timestamp", "description" and "amount" fields are mandatory.');
  }
  return expenseModel
    .insert({timestamp, description, amount, comment, owner: user.id})
    .then(() => {
      res.sendStatus(201);
      next();
    });
}

function getExpenses(req, res, next) {
  const {user} = req;
  const {view} = req.query;
  const getData = (view === 'all' && authorizeGetAll(user))
    ? expenseModel.getAll()
    : expenseModel.getAllForUser(user.id);
  return getData
    .then((data) => {
      res.json(data);
      next();
    });
}

function getExpense(req, res, next) {
  const {user} = req;
  const {id} = req.params;
  return expenseModel
    .findById(id)
    .then((expense) => {
      if (expense && authorizeExpenseAction(expense, user)) {
        res.json(expense);
        next();
      } else {
        res.sendStatus(404);
      }
    });
}

function deleteExpense(req, res, next) {
  const {user} = req;
  const {id} = req.params;
  return expenseModel
    .findById(id)
    .then((expense) => {
      if (expense && authorizeExpenseAction(expense, user)) {
        return expense
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

function putExpense(req, res, next) {
  const {user} = req;
  const {id} = req.params;
  const {timestamp, description, amount, comment} = req.body;
  if (!timestamp || !Date.parse(timestamp) || !description || !amount) {
    return res.status(400).json('"timestamp", "description" and "amount" fields are mandatory.');
  }
  return expenseModel
    .findById(id)
    .then((expense) => {
      if (expense && authorizeExpenseAction(expense, user)) {
        expense.timestamp = timestamp;
        expense.description = description;
        expense.amount = amount;
        expense.comment = comment;
        return expense
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

function authorizeGetAll(user) {
  return user.role === 'admin';
}

function authorizeExpenseAction(expense, user) {
  return expense.owner === user.id || user.role === 'admin';
}

module.exports = {
  postExpenses,
  getExpenses,
  deleteExpense,
  getExpense,
  putExpense
};