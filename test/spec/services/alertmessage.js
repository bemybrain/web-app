'use strict';

describe('Service: AlertMessage', function () {

  // load the service's module
  beforeEach(module('webAppApp'));

  // instantiate service
  var AlertMessage;
  beforeEach(inject(function (_AlertMessage_) {
    AlertMessage = _AlertMessage_;
  }));

  it('should do something', function () {
    expect(!!AlertMessage).toBe(true);
  });

});
