const express = require('express');
const router = express.Router();
const expensesController = require('./expenses_controller');
const {authorize} = require('../utils/authorization');

router.post('/', authorize(), expensesController.postExpenses);
router.get('/', authorize(), expensesController.getExpenses);
router.get('/:id', authorize(), expensesController.getExpense);
router.delete('/:id', authorize(), expensesController.deleteExpense);
router.put('/:id', authorize(), expensesController.putExpense);

module.exports = router;
