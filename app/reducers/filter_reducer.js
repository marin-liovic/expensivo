const initialState = {
  description: '',
  amount: {
    from: '',
    to: ''
  },
  date: {}
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
    case 'UPDATE_DATE_FROM':
      state = {...state};
      state.date.from = action.payload;
      break;
    case 'UPDATE_DATE_TO':
      state = {...state};
      state.date.to = action.payload;
      break;
    case 'UPDATE_DESCRIPTION':
      state = {...state};
      state.description = action.payload;
      break;
    case 'LOGOUT_FULFILLED':
      state = {
        amount: {
          from: '',
          to: ''
        },
        date: {}
      };
      break;
  }
  return state;
}