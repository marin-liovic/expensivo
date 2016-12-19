import axios from 'axios';
import {getToken} from '../../utils/auth_utils';

export function postUsers(data) {
  return request({
    data,
    method: 'post',
    url: '/users'
  });
}

export function postAuthAccessToken(data) {
  return request({
    data,
    method: 'post',
    url: '/auth/access_token'
  });
}

export function deleteAuthAccessToken(token) {
  return request({
    method: 'delete',
    url: `/auth/access_token/${token}`
  });
}

export function getExpenses(options) {
  return request({
    method: 'get',
    url: '/expenses',
    params: options
  });
}

export function postExpenses(data) {
  return request({
    data,
    method: 'post',
    url: '/expenses'
  });
}

export function deleteExpense(id) {
  return request({
    method: 'delete',
    url: `/expenses/${id}`
  });
}

export function putExpense(expense) {
  return request({
    method: 'put',
    url: `/expenses/${expense.id}`,
    data: expense
  });
}

export function getExpense(id) {
  return request({
    method: 'get',
    url: `/expenses/${id}`
  });
}

export function getMe() {
  return request({
    method: 'get',
    url: '/me'
  });
}

export function getUsers() {
  return request({
    method: 'get',
    url: '/users'
  });
}

export function deleteUser(id) {
  return request({
    method: 'delete',
    url: `/users/${id}`
  });
}

export function putUser(user) {
  return request({
    method: 'put',
    url: `/users/${user.id}`,
    data: user
  });
}

export function getUser(id) {
  return request({
    method: 'get',
    url: `/users/${id}`
  });
}

function request(options) {
  options.headers = {authorization:`Bearer ${getToken()}`};
  return axios.request(options)
    .then((request) => {
      return request.data;
    });
}