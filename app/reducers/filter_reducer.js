const initialState = {
  amount: {
    from: '',
    to: ''
  }
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_AMOUNT_FROM':
      state = {...state};
      state.amount.from = action.payload;
      break;
    case 'UPDATE_AMOUNT_TO':
      state = {...state};
      state.amount.to = action.payload;
      break;
  }
  return state;
}