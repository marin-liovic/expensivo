import {postUsers, postAuthAccessToken, getMe} from './utils/api_client';

export function signup(data) {
  return {
    type: 'SIGNUP',
    payload: postUsers(data)
      .then(() => {
        return postAuthAccessToken(data);
      })
      .then((token) => {
        sessionStorage.setItem('token', token);
        return getMe();
      })
  };
}

export function login(data) {
  return {
    type: 'LOGIN',
    payload: postAuthAccessToken(data)
      .then((token) => {
        sessionStorage.setItem('token', token);
        return getMe();
      })
  };
}
