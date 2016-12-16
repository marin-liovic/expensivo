import axios from 'axios';

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

export function getExpenses() {
  return request({
    method: 'get',
    url: '/expenses'
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

function request(options) {
  options.headers = {authorization:`Bearer ${sessionStorage.getItem('token')}`};
  return axios.request(options)
    .then((request) => {
      return request.data;
    });
}