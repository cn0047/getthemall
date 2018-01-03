const nock = require('nock');
const { expect } = require('chai');

const getThemAll = require('./../../src/index');

describe('#getthemall - index unit tests.', async () => {
  it('Main test - 1 endpoint', (done) => {
    // Mock `fetch` function.
    nock('https://fake.host.com')
      .get('/users/1')
      .reply(200, '{"id": 1, "name": "James Bond"}');
    // Prepare request.
    const query = { userWithId1: 'users/1' };

    // Perform action.
    getThemAll('https://fake.host.com/', query, (actualResult) => {
      expect(actualResult.userWithId1.data).to.have.all.keys('id', 'name');
      done();
    });
  });

  it('Main test - 2 endpoint', (done) => {
    // Mock `fetch` function.
    const n = nock('https://fake.host.com');
    n.get('/users/2').reply(200, '{"id": 2, "name": "Felix Leiter"}');
    n.get('/users/3').reply(200, '{"id": 3, "name": "Q"}');
    // Prepare request.
    const query = { userWithId2: 'users/2', userWithId3: 'users/3' };

    // Perform action.
    getThemAll('https://fake.host.com/', query, (actualResult) => {
      expect(actualResult).to.have.all.keys('userWithId2', 'userWithId3');
      expect(actualResult.userWithId2.data).to.have.all.keys('id', 'name');
      expect(actualResult.userWithId3.data).to.have.all.keys('id', 'name');
      done();
    });
  });
});
