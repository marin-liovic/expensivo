const expect = require('chai').expect;
const apiClient = require('../api_client');
const config = require('../config.json');

function validateUser(user) {
  expect(user).to.be.an('object');
  expect(user.id).to.be.a('number');
  expect(user.email).to.be.a('string').and.to.be.ok;
  expect(user.role).to.be.a('string').and.to.be.ok;
  expect(user).to.not.have.property('password');
}

function validateUsers(users) {
  expect(users).to.be.an('array');
  users.forEach((user) => {
    validateUser(user);
  });
}

describe('/users', () => {
  describe('GET /users', () => {
    const {getUsers} = apiClient;

    it('should return 401 if unauthenticated request', () => {
      return getUsers()
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });

    it('should return 403 for regular user', () => {
      return getUsers({auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(403);
        });
    });

    it('should return all users for user manager', () => {
      return getUsers({auth: 'userManager'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateUsers(response.body);
        });
    });

    it('should return all users for admin', () => {
      return getUsers({auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateUsers(response.body);
        });
    });
  });

  describe('POST /users', () => {
    const {postUsers} = apiClient;

    it('should create an user', () => {
      const body = {email: `test_${Date.now()}@test.com`, password: 'test'};
      return postUsers({body})
        .then((response) => {
          expect(response).to.have.status(201);
        });
    });

    it('should return 400 if missing email', () => {
      const body = {password: 'test'};
      return postUsers({body})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });

    it('should return 400 if missing password', () => {
      const body = {email: `test_${Date.now()}@test.com`};
      return postUsers({body})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });
  });

  describe('GET /users/{id}', () => {
    const {getUser} = apiClient;

    it('should return 401 if no authentication', () => {
      return getUser()
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });

    it('should return me', () => {
      return getUser({id: config.user.id, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateUser(response.body);
        });
    });

    it('should return 404 if not my ID', () => {
      return getUser({id: `${config.user.id}0`, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should return user for user manager', () => {
      return getUser({id: config.user.id, auth: 'userManager'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateUser(response.body);
        });
    });

    it('should return user for admin', () => {
      return getUser({id: config.user.id, auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateUser(response.body);
        });
    });
  });

  describe('DELETE /users/{id}', () => {
    const {deleteUser, postUsers, postAuthAccessToken, getMe} = apiClient;
    let id, accessToken;

    before(() => {
      const email = `test_${Date.now()}@test.com`;
      const password = 'test';
      const body = {email, password};
      return postUsers({body})
        .then((response) => {
          expect(response).to.have.status(201);
          return postAuthAccessToken({body});
        })
        .then((response) => {
          expect(response).to.have.status(201);
          accessToken = response.body;
          return getMe({accessToken});
        })
        .then((response) => {
          expect(response).to.have.status(200);
          id = response.body.id;
        });
    });

    it('should return 403 if user is trying to delete', () => {
      return deleteUser({id, accessToken})
        .then((response) => {
          expect(response).to.have.status(403);
        });
    });

    it('should return 404 if no user to delete', () => {
      return deleteUser({id: 'foo', auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should delete user', () => {
      return deleteUser({id, auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(200);
        });
    });
  });

  describe('PUT /users/{id}', () => {
    const {putUser, postUsers, postAuthAccessToken, getMe} = apiClient;
    let id, accessToken;

    before(() => {
      const email = `test_${Date.now()}@test.com`;
      const password = 'test';
      const body = {email, password};
      return postUsers({body})
        .then((response) => {
          expect(response).to.have.status(201);
          return postAuthAccessToken({body});
        })
        .then((response) => {
          expect(response).to.have.status(201);
          accessToken = response.body;
          return getMe({accessToken});
        })
        .then((response) => {
          expect(response).to.have.status(200);
          id = response.body.id;
        });
    });

    it('should return 403 if user is trying to update', () => {
      return putUser({id, accessToken})
        .then((response) => {
          expect(response).to.have.status(403);
        });
    });

    it('should return 404 if no user to update', () => {
      return putUser({id: 'foo', auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should update user', () => {
      return putUser({id, auth: 'admin', body: {email: `test_${Date.now()}@test.com`, role: 'user'}})
        .then((response) => {
          expect(response).to.have.status(200);
        });
    });
  });
});
