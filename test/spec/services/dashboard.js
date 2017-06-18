'use strict';

describe('Service: Dashboard', function () {

  // load the service's module
  beforeEach(module('webAppApp'));

  // instantiate service
  var Dashboard;
  beforeEach(inject(function (_Dashboard_) {
    Dashboard = _Dashboard_;
  }));

  it('should do something', function () {
    expect(!!Dashboard).toBe(true);
  });

});
