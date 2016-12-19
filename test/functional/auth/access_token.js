const expect = require('chai').expect;
const apiClient = require('../api_client');
const user = require('../config.json').user;

describe('/auth', () => {
  describe('POST /auth/access_token', () => {
    const {postAuthAccessToken} = apiClient;

    it('should return an access token for valid login', () => {
      const body = {email: user.email, password: user.password};
      return postAuthAccessToken({body})
        .then((response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.a('string').and.to.be.ok;
        });
    });

    it('should return 401 if bad email', () => {
      const body = {email: 'foo', password: user.password};
      return postAuthAccessToken({body})
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });

    it('should return 401 if bad password', () => {
      const body = {email: user.email, password: 'foo'};
      return postAuthAccessToken({body})
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });
  });

  describe('DELETE /auth/access_token/{value}', () => {
    const {deleteAuthAccessToken, postAuthAccessToken} = apiClient;
    let value;

    before(() => {
      const body = {email: user.email, password: user.password};
      return postAuthAccessToken({body})
        .then((response) => {
          expect(response).to.have.status(201);
          value = response.body;
        });
    });

    it('should return 401 if not authenticated', () => {
      return deleteAuthAccessToken({id: value})
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });

    it('should return 404 if no token to delete', () => {
      return deleteAuthAccessToken({id: 'foo', auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should return 404 if user not owner', () => {
      return deleteAuthAccessToken({id: value, auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should delete my token', () => {
      return deleteAuthAccessToken({id: value, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
        });
    });
  });
});
