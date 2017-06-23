var nock = require('nock');
const chai = require('chai');
const expect = chai.expect;

const getthemall = require('../index');

describe('#getthemall', function() {

  it('Main test', function(done) {
    // Mock `fetch` function.
    nock('https://fake.host.com')
      .get('/users/1')
      .reply(200, '{"id": 1, "name": "James Bond"}')
    ;
    // Stub express request.
    var req = {
      protocol: 'https',
      get: function (key) {
        return 'fake.host.com';
      },
      query: {
        usersList: 'users/1'
      }
    };
    // Perform action.
    getthemall(req, function (data) {
      var actualResult = JSON.stringify(data);
      var expectedResult = '{"usersList":{"id":1,"name":"James Bond"}}';
      expect(actualResult).to.equal(expectedResult);
      done();
    });
  });

});
