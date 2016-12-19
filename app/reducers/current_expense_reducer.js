const initialState = {
  item: {
    timestamp: '',
    amount: '',
    description: '',
    comment: ''
  }
};

export default function currentExpenseReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_EXPENSE_FULFILLED':
      state = {...state, item: action.payload};
      break;
    case 'GET_CURRENT_EXPENSE_FULFILLED':
      state = {...state, item: action.payload};
      break;
    case 'LOGOUT_FULFILLED':
      state = {
        item: {
          timestamp: '',
          amount: '',
          description: '',
          comment: ''
        }
      };
      break;
  }
  return state;
}