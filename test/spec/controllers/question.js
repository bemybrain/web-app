'use strict';

describe('Controller: QuestionCtrl', function () {

  // load the controller's module
  beforeEach(module('webAppApp'));

  var QuestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionCtrl = $controller('QuestionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(QuestionCtrl.awesomeThings.length).toBe(3);
  });
});
