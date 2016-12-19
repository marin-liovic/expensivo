import {combineReducers} from 'redux';
import expenses from './expenses_reducer';
import authentication from './authentication_reducer';
import alert from './alert_reducer';
import currentExpense from './current_expense_reducer';
import users from './users_reducer'
import currentUser from './current_user_reducer';
import filter from './filter_reducer';

export default combineReducers({
  expenses,
  currentExpense,
  authentication,
  alert,
  users,
  currentUser,
  filter
})