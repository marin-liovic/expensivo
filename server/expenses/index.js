const express = require('express');
const router = express.Router();
const expensesController = require('./expenses_controller');
const {authorize} = require('../utils/authorization');

router.post('/', authorize(),expensesController.postExpenses);
router.get('/', authorize(), expensesController.getExpenses);
router.delete('/:id', authorize(),expensesController.deleteExpense);

module.exports = router;
