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

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.newQuestion = function (data) {
      var currentUser = AuthenticationService.getUserInfo()
      var data = {
        title: $scope.newQuestion.title,
        body: $scope.newQuestion.body,
        author: currentUser._id,
        tags: $scope.newQuestion.tags
      }
      Questions.create(data).then(function (res) {
        console.log(res)
        $state.go('question', { id: res.data._id })
      }, function (err) {
        console.log(err)
      })
    }

    $scope.loadTags = function (query) {
      return Tag.findAll()
    }

  })
