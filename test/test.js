import chai from "chai";
import nock from "nock";

import getthemall from "../src/index";

const expect = chai.expect;

describe("#getthemall", function() {

  it("Main test", function(done) {
    // Mock `fetch` function.
    nock("https://fake.host.com")
      .get("/users/1")
      .reply(200, '{"id": 1, "name": "James Bond"}')
    ;
    let query = {
      usersList: "users/1"
    };
    // Perform action.
    getthemall("https://fake.host.com/", query, data => {
      let actualResult = JSON.stringify(data);
      let expectedResult = '{"usersList":{"id":1,"name":"James Bond"}}';
      expect(actualResult).to.equal(expectedResult);
      done();
    });
  });

});
