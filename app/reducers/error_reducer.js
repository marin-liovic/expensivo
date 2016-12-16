export default function errorReducer(state = {}, action) {
  if (action.type.endsWith('_REJECTED')) {
    state = {
      message: action.payload.message || 'An error occurred! Please try again.'
    }
  }
  return state;
}