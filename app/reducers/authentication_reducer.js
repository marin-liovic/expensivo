const initialState = {
  isAuthenticated: false,
  me: {}
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_FULFILLED':
      state = {...state, isAuthenticated: true, me: action.payload};
      break;
    case 'LOGIN_FULFILLED':
      state = {...state, isAuthenticated: true, me: action.payload};
      break;
    case 'LOGOUT_FULFILLED':
      state = {isAuthenticated: false, me: {}};
      break;
  }
  return state;
}