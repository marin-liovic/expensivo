const initialState = {
  items: []
};

export default function expensesReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_EXPENSES_FULFILLED':
      state = {...state, items: action.payload};
      break;
    case 'REMOVE_EXPENSE_FULFILLED':
      state = {...state, items: action.payload};
      break;
    case 'LOGOUT_FULFILLED':
      state = {
        items: []
      };
      break;
  }
  return state;
}