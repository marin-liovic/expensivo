export default function alertReducer(state = {}, action) {
  if (action.type.endsWith('_REJECTED')) {
    state = {
      type: 'danger',
      message: action.payload.message || 'An error occurred! Please try again.'
    };
  } else if (action.type === 'ALERT') {
    state = action.payload;
  } else if (action.type === 'DISMISS_ALERT') {
    state = {};
  } else if (action.type === 'NEW_EXPENSE_FULFILLED') {
    state = {
      type: 'success',
      message: 'Created successfully!'
    };
  } else if (action.type === 'UPDATE_CURRENT_EXPENSE_FULFILLED') {
    state = {
      type: 'success',
      message: 'Updated successfully!'
    };
  } else if (action.type === 'LOGOUT_FULFILLED') {
    state = {};
  }
  return state;
}