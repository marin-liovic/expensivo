const initialState = {
  items: []
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS_FULFILLED':
      state = {...state, items: action.payload};
      break;
    case 'REMOVE_USER_FULFILLED':
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