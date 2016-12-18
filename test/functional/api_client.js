const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const config = require('./config.json');

function postAuthAccessToken(options={}) {
  options.method = 'post';
  options.path = '/auth/access_token';
  return request(options);
}

function getUsers(options={}) {
  options.method = 'get';
  options.path = '/users';
  return request(options);
}

function postUsers(options={}) {
  options.method = 'post';
  options.path = '/users';
  return request(options);
}

function getUser(options={}) {
  options.method = 'get';
  options.path = `/users/${options.id}`;
  return request(options);
}

function deleteUser(options={}) {
  options.method = 'delete';
  options.path = `/users/${options.id}`;
  return request(options);
}

function putUser(options={}) {
  options.method = 'put';
  options.path = `/users/${options.id}`;
  return request(options);
}

function getMe(options={}) {
  options.method = 'get';
  options.path = '/me';
  return request(options);
}

function getExpenses(options={}) {
  options.method = 'get';
  options.path = '/expenses';
  return request(options);
}

function postExpenses(options={}) {
  options.method = 'post';
  options.path = '/expenses';
  return request(options);
}

function getExpense(options={}) {
  options.method = 'get';
  options.path = `/expenses/${options.id}`;
  return request(options);
}

function deleteExpense(options={}) {
  options.method = 'delete';
  options.path = `/expenses/${options.id}`;
  return request(options);
}

function putExpense(options={}) {
  options.method = 'put';
  options.path = `/expenses/${options.id}`;
  return request(options);
}

function request(options={}) {
  const {method, path, body, query, auth, accessToken} = options;
  const request = chai
    .request(config.host)[method](path)
    .query(query);
  addAuth(request, auth, accessToken);
  return request.send(body)
    .catch((response) => {
      return response;
    });
}

function addAuth(request, auth, accessToken) {
  if (auth) {
    request.set('Authorization', `Bearer ${config[auth].accessToken}`);
  } else if (accessToken) {
    request.set('Authorization', `Bearer ${accessToken}`);
  }
}

module.exports = {
  postAuthAccessToken,
  getUsers,
  postUsers,
  getUser,
  deleteUser,
  putUser,
  getMe,
  getExpenses,
  postExpenses,
  getExpense,
  deleteExpense,
  putExpense
};