'use strict';

describe('Controller: QuestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('webAppApp'));

  var QuestionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionsCtrl = $controller('QuestionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(QuestionsCtrl.awesomeThings.length).toBe(3);
  });
});
