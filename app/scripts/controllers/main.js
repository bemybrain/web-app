'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('MainCtrl', function ($scope, $state, AuthenticationService) {
    $scope.currentState = $state.current.name
    $scope.currentState = $state.current.name

    $scope.login = function (username, password) {
      var username = username || $scope.login.username
      var password = password || $scope.login.password

      AuthenticationService.login(username, password).then(function (data) {
        $scope.getUserInfo()
        $state.go('questions')
      })
    }

    $scope.logout = function () {
      AuthenticationService.logout()
    }

    $scope.isLoggedIn = function () {
      console.log(AuthenticationService.getUserInfo())
    }

    $scope.getUserInfo = function () {
      $scope.userInfo = AuthenticationService.getUserInfo()
    }
  })
