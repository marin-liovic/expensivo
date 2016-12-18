const expect = require('chai').expect;
const apiClient = require('../api_client');
const user = require('../config.json').user;

describe('/me', () => {
  describe('GET /me', () => {
    const {getMe} = apiClient;

    it('should return me', () => {
      return getMe({auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('id', user.id);
          expect(response.body).to.have.property('email', user.email);
          expect(response.body).to.have.property('role', 'user');
          expect(response.body).to.not.have.property('password');
        });
    });

    it('should return 401 if no authentication', () => {
      return getMe()
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });
  });
});
