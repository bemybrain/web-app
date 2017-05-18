'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:NewQuestionCtrl
* @description
* # NewQuestionCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('DashboardCtrl', function ($scope, $state, Questions, User, AuthenticationService, Tag) {

    var user = AuthenticationService.getUserInfo()

    function init () {
      console.log(user);
      $scope.user = user
    }

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.countAswers = function () {

    }

    $scope.countUpvotes = function () {

    }

    $scope.getTitle = function (title) {

    }

    $scope.labels = ['Java', 'Ruby', 'Biologia'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40]
    ];

    init()
})
