'use strict';

describe('Service: ENV', function () {

  // load the service's module
  beforeEach(module('webAppApp'));

  // instantiate service
  var ENV;
  beforeEach(inject(function (_ENV_) {
    ENV = _ENV_;
  }));

  it('should do something', function () {
    expect(!!ENV).toBe(true);
  });

});
