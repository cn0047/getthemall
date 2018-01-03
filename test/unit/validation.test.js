const { expect } = require('chai');

const validation = require('./../../src/validation');

describe('#getthemall - validation unit tests.', async () => {
  describe('Tests related to method `checkUrl`.', () => {
    it('Null as URL', () => {
      expect(() => {
        validation.checkUrl(null);
      }).to.throw('Invalid URL.');
    });

    it('Empty string as URL', () => {
      expect(() => {
        validation.checkUrl('');
      }).to.throw('Invalid URL.');
    });

    it('foo.bar as URL', () => {
      expect(() => {
        validation.checkUrl('foo.bar');
      }).to.throw('Invalid URL.');
    });

    it('Valid URL', () => {
      expect(() => {
        validation.checkUrl('https://api.github.com/');
      }).to.not.throw('Error.');
    });
  });

  describe('Tests related to method `checkQuery`.', () => {
    it('Null as query', () => {
      expect(() => {
        validation.checkQuery(null);
      }).to.throw('Query cannot be NULL, Query must be an object.');
    });

    it('Null as query', () => {
      expect(() => {
        validation.checkQuery({});
      }).to.throw('Query object must have at least one property.');
    });

    it('Valid query', () => {
      expect(() => {
        validation.checkQuery({ users: '/users/github' });
      }).to.not.throw('Error.');
    });
  });

  describe('Tests related to method `checkCallback`.', () => {
    it('Null as callback', () => {
      expect(() => {
        validation.checkCallback(null);
      }).to.throw('Callback must be a function.');
    });

    it('Valid callback', () => {
      expect(() => {
        validation.checkCallback(() => {});
      }).to.not.throw('Error.');
    });
  });
});
