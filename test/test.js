var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});




// Test fails
// error when no url
// error when no flags specified
// 

// Other Tests
// if everything flag set, make sure all other flags are set
// 
// test an example image list 
// test an example link list
// test an example title list
// 
// test search string 
// 	with selector and without selector