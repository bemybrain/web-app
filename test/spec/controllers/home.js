'use strict';

describe('Controller: HomectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('webAppApp'));

  var HomectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomectrlCtrl = $controller('HomectrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HomectrlCtrl.awesomeThings.length).toBe(3);
  });
});
