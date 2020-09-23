var assert = require('assert');


describe("maths", function() {
    it("should return 9 when 3*3 is run", function() {
      assert.strictEqual((3*3), 9);
    });
  
    it("should return -8 when (3-4)*8 is run", function() {
      assert.strictEqual(((3-4)*8), -8);
    });
    describe("addition", function() {
      it("should return 2 when 1+1", function() {
        assert.strictEqual(1+1, 2);
      });
    });
  });