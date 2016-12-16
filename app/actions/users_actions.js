import {getUsers, deleteUser, putUser, getUser} from './utils/api_client';

export function getAllUsers() {
  return {
    type: 'GET_USERS',
    payload: getUsers()
  };
}

export function removeUser(id) {
  return {
    type: 'REMOVE_USER',
    payload: deleteUser(id)
      .then(getUsers)
  };
}

export function updateUser(user) {
  return {
    type: 'UPDATE_CURRENT_USER',
    payload: putUser(user)
      .then(() => getUser(user.id))
  }
}

export function getCurrentUser(id) {
  return {
    type: 'GET_CURRENT_USER',
    payload: getUser(id)
  };
}
