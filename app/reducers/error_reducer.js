export default function errorReducer(state = {}, action) {
  if (action.type.endsWith('_REJECTED')) {
    state = {
      message: action.payload.message || 'An error occurred! Please try again.'
    };
  } else if (action.type === 'DISMISS_ALERT') {
    state = {};
  }
  return state;
}