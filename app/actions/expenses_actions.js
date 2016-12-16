import {getExpenses, postExpenses, deleteExpense, putExpense, getExpense} from './utils/api_client';

export function getAllExpenses(options) {
  return {
    type: 'GET_EXPENSES',
    payload: getExpenses(options)
  };
}

export function newExpense(data) {
  return {
    type: 'NEW_EXPENSE',
    payload: postExpenses(data)
  };
}

export function removeExpense(id, view) {
  return {
    type: 'REMOVE_EXPENSE',
    payload: deleteExpense(id)
      .then(() => getExpenses({view}))
  };
}

export function updateExpense(expense) {
  return {
    type: 'UPDATE_CURRENT_EXPENSE',
    payload: putExpense(expense)
      .then(() => getExpense(expense.id))
  }
}

export function getCurrentExpense(id) {
  return {
    type: 'GET_CURRENT_EXPENSE',
    payload: getExpense(id)
  };
}
