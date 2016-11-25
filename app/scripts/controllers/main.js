'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('MainCtrl', function ($scope, $location, $state, AuthenticationService) {

    $scope.userInfo = AuthenticationService.getUserInfo() || null
    $scope.currentState = $state.current.name
    $scope.newUser = {}
    $scope.loading = false

    $scope.signup = function (userData) {
      $scope.loading = true
      if (!userData) var userData = $scope.newUser
      if (userData.name && userData.email && userData.username && userData.password) {
        AuthenticationService.signup(userData).then(function (data) {
          $scope.loading = false
          $scope.getUserInfo()
          $state.go('myprofile')
        })
      }
    }

    $scope.login = function (username, password) {
      $scope.loading = true
      var username = username || $scope.login.username
      var password = password || $scope.login.password

      AuthenticationService.login(username, password).then(function (data) {
        $scope.loading = false
        $scope.getUserInfo()
        $state.go('main.questions')
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
