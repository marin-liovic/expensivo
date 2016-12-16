import {getExpenses, postExpenses, deleteExpense} from './utils/api_client';

export function getAllExpenses() {
  return {
    type: 'GET_EXPENSES',
    payload: getExpenses()
  };
}

export function newExpense(data) {
  return {
    type: 'NEW_EXPENSE',
    payload: postExpenses(data)
  };
}

export function removeExpense(id) {
  return {
    type: 'REMOVE_EXPENSE',
    payload: deleteExpense(id)
      .then(getExpenses)
  };
}