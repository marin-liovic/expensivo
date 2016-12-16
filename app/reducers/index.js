import {combineReducers} from 'redux';
import expenses from './expenses_reducer';
import authentication from './authentication_reducer';
import error from './error_reducer';

export default combineReducers({
  expenses,
  authentication,
  error
})