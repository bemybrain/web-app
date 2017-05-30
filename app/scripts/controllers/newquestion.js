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
    $scope.tags = []
    $scope.loading = false

    function init () {
      getTags()
    }

    function getTags () {
      Tag.findAll()
        .then(function (res) {
          $scope.tags = res.data
        })
    }

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
      return _.filter($scope.tags, function (tag) {
        return tag.name.toUpperCase().includes(query.toUpperCase())
      })
    }

    init()

  })
