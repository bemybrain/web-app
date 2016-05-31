'use strict';

describe('Service: Questions', function () {

  // load the service's module
  beforeEach(module('webAppApp'));

  // instantiate service
  var Questions;
  beforeEach(inject(function (_Questions_) {
    Questions = _Questions_;
  }));

  it('should do something', function () {
    expect(!!Questions).toBe(true);
  });

});
