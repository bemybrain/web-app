'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('UserCtrl', function ($scope, $state, User, AuthenticationService) {
    $scope.profile = angular.copy(AuthenticationService.getUserInfo()) || {}

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.getUserInfo = function () {
      $scope.profile = AuthenticationService.getUserInfo()
    }

    $scope.updateProfile = function (id, data) {
      if (!id) id = $scope.profile._id
      if (!data) data = {}
      data.name = data.name || $scope.profile.name
      data.username = data.username || $scope.profile.username
      data.email = data.email || $scope.profile.email
      data.interests = data.interests || $scope.profile.interests
      console.log(id)
      console.log(data)
      User.update(id, data).then(function (res) {
        $state.go('logout')
      }, function (err) {
        console.log(err)
      })
    }

  })
