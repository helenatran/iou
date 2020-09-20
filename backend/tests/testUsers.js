var assert = require('assert');

//example test - feel free to delete
describe("arrays", function() {
    describe('push', function() {
        it("should add a element to the array", function() {
            myArray = [1, 2, 3];
            assert.strictEqual(myArray.length, 3, "length of array should be 3");
            myArray.push(4);
            assert.strictEqual(myArray.length, 4, "length of array should now be 4 after pushing one");
        });
    });
});