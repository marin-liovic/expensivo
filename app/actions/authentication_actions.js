import {postUsers, postAuthAccessToken, deleteAuthAccessToken, getMe} from './utils/api_client';
import {authenticate, deleteToken, getToken} from '../utils/auth_utils';

export function signup(data) {
  return {
    type: 'SIGNUP',
    payload: postUsers(data)
      .then(() => {
        return postAuthAccessToken(data);
      })
      .then((token) => {
        authenticate(token);
        return getMe();
      })
  };
}

export function login(data) {
  return {
    type: 'LOGIN',
    payload: postAuthAccessToken(data)
      .then((token) => {
        authenticate(token);
        return getMe();
      })
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
    payload: deleteAuthAccessToken(getToken())
      .then(() => {
        deleteToken();
      })
  };
}
