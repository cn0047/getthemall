const { expect } = require('chai');

const getThemAll = require('./../../src/index');

describe('#getthemall - index integration tests.', async () => {
  it('Main test - 1 valid endpoint', (done) => {
    getThemAll('https://api.github.com/', { users: 'users/github' }, (data) => {
      expect(data).to.have.all.keys('users');
      done();
    });
  });

  it('Main test - 1 invalid endpoint', (done) => {
    getThemAll('https://api.github/', { mustBeError: 'endpoint/to/error' }, (actualResult) => {
      expect(actualResult.mustBeError.data).to.equal(undefined);
      expect(actualResult.mustBeError.error.length).to.not.equal(0);
      done();
    });
  });
});
