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
    $scope.newUser = {}

    $scope.signup = function (userData) {
      console.log($scope.newUser)
      if (!userData) var userData = $scope.newUser
      if (userData.name && userData.email && userData.username && userData.password) {
        AuthenticationService.signup(userData).then(function (data) {
          $scope.getUserInfo()
          $state.go('myprofile')
        })
      }
    }

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
      return AuthenticationService.isLoggedIn()
    }

    $scope.getUserInfo = function () {
      $scope.userInfo = AuthenticationService.getUserInfo()
    }
  })
