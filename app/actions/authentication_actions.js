import {postUsers, postAuthAccessToken} from './utils/api_client';

export function signup(data) {
  return {
    type: 'SIGNUP',
    payload: postUsers(data)
      .then(() => {
        return postAuthAccessToken(data);
      })
  };
}

export function login(data) {
  return {
    type: 'LOGIN',
    payload: postAuthAccessToken(data)
  };
}
