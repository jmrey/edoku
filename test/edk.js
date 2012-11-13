var assert = require('chai').assert;
var edk = require('../edk');

describe('EDK', function () {
  describe('#paths', function () {
    it('should have paths property', function () {
      assert.property(edk, 'paths');
      assert.deepProperty(edk, 'paths.root');
      assert.deepProperty(edk, 'paths.app');
      assert.deepProperty(edk, 'paths.public');
      console.log(edk.paths);
    });
  });
  
  describe('#conf', function () {
    edk.init();
    it('should have conf property', function () {
      assert.property(edk, 'conf');
    });
  });
  
  describe('#App', function () {
    edk.init();
    it('should have app property', function () {
      assert.property(edk, 'App');
    });
  });
  
  describe('#run()', function () {
    edk.run();
    it('should run server.');
  });
});
