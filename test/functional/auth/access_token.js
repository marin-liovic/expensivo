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
});
