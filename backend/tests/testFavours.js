var assert = require('assert');

//example test - feel free to delete
describe("strings", function() {
    describe("repeat()", function() {
      it("should return 'dogdog' when dog is repeated twice", function() {
          assert.strictEqual("dog".repeat(2), "dogdog");
      });
    });
  });