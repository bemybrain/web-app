'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:NewQuestionCtrl
* @description
* # NewQuestionCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('NewQuestionCtrl', function ($scope, $state, Questions, User, AuthenticationService, AlertMessage, Tag) {
    var tags = Tag.getAll()
    $scope.tags = tags
    $scope.newQuestion = {}
    $scope.loading = false

    function init () {
      setTags()
    }

    function setTags () {
      return Tag.set().catch(handleErr)
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
      return _.filter(tags, function (tag) {
        return tag.name.toUpperCase().includes(query.toUpperCase())
      })
    }

    function handleErr (err) {
      console.log(err)
      AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
    }

    init()

  })
