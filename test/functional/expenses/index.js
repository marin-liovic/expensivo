const expect = require('chai').expect;
const apiClient = require('../api_client');
const config = require('../config.json');

function validateExpense(expense, owner) {
  expect(expense).to.be.an('object');
  expect(expense.id).to.be.a('number');
  expect(expense.amount).to.be.a('number');
  expect(expense.timestamp).to.be.a('string').and.to.be.ok;
  expect(expense.description).to.be.a('string').and.to.be.ok;
  expect(expense.owner).to.be.a('number').and.to.be.ok;
  if (owner) {
    expect(expense.owner).to.eql(owner);
  }
  expect(expense.comment).to.be.a('string');
}

function validateExpenses(expenses, owner) {
  expect(expenses).to.be.an('array');
  expenses.forEach((expense) => {
    validateExpense(expense, owner);
  });
}

describe('/expenses', () => {
  describe('GET /expenses', () => {
    const {getExpenses} = apiClient;

    it('should return 401 if unauthenticated request', () => {
      return getExpenses()
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });

    it('should return my expenses', () => {
      return getExpenses({auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateExpenses(response.body, config.user.id);
        });
    });

    it('should return all expenses for admin', () => {
      return getExpenses({auth: 'admin', query: {view: 'all'}})
        .then((response) => {
          expect(response).to.have.status(200);
          validateExpenses(response.body);
          const isOwnerDifferent = response.body.reduce((isOneDifferent, expense) => {
            return isOneDifferent || expense.owner !== config.admin.id;
          }, false);
          expect(isOwnerDifferent).to.eql(true);
        });
    });
  });

  describe('POST /expenses', () => {
    const {postExpenses} = apiClient;

    it('should create an expense', () => {
      const body = {amount: 100, description: 'test', comment: 'test comment', timestamp: '2016-12-12T12:12:12.123Z'};
      return postExpenses({body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(201);
        });
    });

    it('should return 401 if not authenticated', () => {
      return postExpenses()
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });

    it('should return 400 if no amount', () => {
      const body = {description: 'test', comment: 'test comment', timestamp: '2016-12-12T12:12:12.123Z'};
      return postExpenses({body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });

    it('should return 400 if no description', () => {
      const body = {amount: 100, comment: 'test comment', timestamp: '2016-12-12T12:12:12.123Z'};
      return postExpenses({body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });

    it('should return 400 if no timestamp', () => {
      const body = {amount: 100, description: 'test', comment: 'test comment'};
      return postExpenses({body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });
  });

  describe('GET /expenses/{id}', () => {
    const {getExpense, getExpenses} = apiClient;
    let id;

    before(() => {
      return getExpenses({auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
          id = response.body[0].id;
        });
    });

    it('should return 401 if no authentication', () => {
      return getExpense()
        .then((response) => {
          expect(response).to.have.status(401);
        });
    });

    it('should return my expense', () => {
      return getExpense({id, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateExpense(response.body);
        });
    });

    it('should return 404 if no expense with given ID', () => {
      return getExpense({id: `-${id}123456`, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should return expense for admin', () => {
      return getExpense({id, auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(200);
          validateExpense(response.body);
        });
    });
  });

  describe('DELETE /users/{id}', () => {
    const {deleteExpense, getExpenses, postExpenses} = apiClient;
    let id1, id2;

    before(() => {
      const body = {amount: 100, description: 'test', comment: 'test comment', timestamp: '2016-12-12T12:12:12.123Z'};
      return Promise.all([
        postExpenses({body, auth: 'user'}),
        postExpenses({body, auth: 'user'})
      ])
        .then((responses) => {
          responses.forEach((response) => {
            expect(response).to.have.status(201);
          });
          return getExpenses({auth: 'user'});
        })
        .then((response) => {
          expect(response).to.have.status(200);
          id1 = response.body[0].id;
          id2 = response.body[1].id;
        });
    });

    it('should delete my expense', () => {
      return deleteExpense({id: id1, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
        });
    });

    it('should return 404 if no expense to delete', () => {
      return deleteExpense({id: 'foo', auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should return 404 if user not owner or admin', () => {
      return deleteExpense({id: id2, auth: 'userManager'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should delete expense if admin', () => {
      return deleteExpense({id: id2, auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(200);
        });
    });
  });

  describe('PUT /expenses/{id}', () => {
    const {putExpense, getExpenses, postExpenses} = apiClient;
    let id;

    before(() => {
      const body = {amount: 100, description: 'test', comment: 'test comment', timestamp: '2016-12-12T12:12:12.123Z'};
      return postExpenses({body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(201);
          return getExpenses({auth: 'user'});
        })
        .then((response) => {
          expect(response).to.have.status(200);
          id = response.body[0].id;
        });
    });

    it('should update my expense', () => {
      const body = {amount: 200, description: 'test updated', comment: 'update', timestamp: '2016-12-13T13:13:13.123Z'};
      return putExpense({id, body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(200);
        });
    });

    it('should return 404 if no expense to update', () => {
      const body = {amount: 300, description: 'cannot update', comment: 'update', timestamp: '2016-12-14T14:14:14.123Z'};
      return putExpense({body, id: `-${id}321312`, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(404);
        });
    });

    it('should update expense if admin', () => {
      const body = {amount: 300, description: 'admin updated', comment: 'update', timestamp: '2016-12-14T14:14:14.123Z'};
      return putExpense({id, body, auth: 'admin'})
        .then((response) => {
          expect(response).to.have.status(200);
        });
    });

    it('should return 400 if no amount', () => {
      const body = {description: 'test updated', comment: 'update', timestamp: '2016-12-13T13:13:13.123Z'};
      return putExpense({id, body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });

    it('should return 400 if no description', () => {
      const body = {amount: 200, comment: 'update', timestamp: '2016-12-13T13:13:13.123Z'};
      return putExpense({id, body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });

    it('should return 400 if no timestamp', () => {
      const body = {amount: 200, description: 'test updated', comment: 'update'};
      return putExpense({id, body, auth: 'user'})
        .then((response) => {
          expect(response).to.have.status(400);
        });
    });
  });
});
