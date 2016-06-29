'use strict';

describe('Controller: NewquestionCtrl', function () {

  // load the controller's module
  beforeEach(module('webAppApp'));

  var NewquestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewquestionCtrl = $controller('NewquestionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewquestionCtrl.awesomeThings.length).toBe(3);
  });
});
