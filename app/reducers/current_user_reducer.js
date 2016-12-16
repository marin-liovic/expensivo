const initialState = {
  item: {
    email: '',
    role: ''
  }
};

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_CURRENT_USER_FULFILLED':
      state = {...state, item: action.payload};
      break;
    case 'GET_CURRENT_USER_FULFILLED':
      state = {...state, item: action.payload};
      break;
  }
  return state;
}