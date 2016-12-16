export default function authenticationReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGNUP_FULFILLED':
      sessionStorage.setItem('token', action.payload);
      state = {isAuthenticated: true};
      break;
    case 'LOGIN_FULFILLED':
      sessionStorage.setItem('token', action.payload);
      state = {isAuthenticated: true};
      break;
  }
  return state;
}