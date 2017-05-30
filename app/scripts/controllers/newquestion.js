'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:NewQuestionCtrl
* @description
* # NewQuestionCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('NewQuestionCtrl', function ($scope, $state, Questions, User, AuthenticationService, Tag) {
    $scope.newQuestion = {}
    $scope.loading = false

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.newQuestion = function (data) {
      $scope.loading = true
      var currentUser = AuthenticationService.getUserInfo()
      var data = {
        title: $scope.newQuestion.title,
        body: $scope.newQuestion.body,
        author: currentUser._id,
        tags: _.map($scope.newQuestion.tags, '_id')
      }
      Questions.create(data)
        .then(function (res) {
          console.log(res)
          $state.go('main.question', { id: res.data._id })
        })
        .catch(function (err) {
          console.log(err)
        })
        .finally(function () {
          $scope.loading = false
        })
    }

    $scope.loadTags = function (query) {
      return Tag.findAll()
    }

  })
