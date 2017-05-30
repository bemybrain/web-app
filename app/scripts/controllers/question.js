'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionCtrl', function ($scope, $state, $stateParams, Questions, Answers, User, AuthenticationService, AlertMessage, Tag) {
    $scope.newAnswer = {}
    $scope.loading = false

    function init () {
      getQuestion($stateParams.id, function () {
        getAnswers()
      })
    }


    function getQuestion (id, callback) {
      if (!id) id = $stateParams.id
      Questions.findOne(id).then(function (res) {
        $scope.question = res.data
        if (callback) callback(res)
      }, function (err) {
        console.log(err)
        AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
      })
    }

    function getAnswers (questionID, callback) {
      if (!questionID) questionID = $scope.question._id
      Answers.findByQuestion(questionID).then(function (res) {
        $scope.answers = res.data
        if (callback) callback(res)
      }, function (err) {
        console.log(err)
        AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
      })
    }

    function sendAnswer (data, callback) {
      Answers.sendAnswer(data)
        .then(function (res) {
          AlertMessage.show('Pronto!', 'Resposta enviada com sucesso.')
        })
        .catch(function (err) {
          console.log(err)
          AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
        })
        .finally(callback)
    }

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.sendAnswer = function () {
      $scope.loading = true
      var currentUser = AuthenticationService.getUserInfo()
      var data = {
        body: $scope.newAnswer.body,
        author: currentUser._id,
        question: $scope.question._id
      }
      sendAnswer(data, function (res) {
        getAnswers()
        $scope.newAnswer = {}
        $scope.loading = false
      })
    }

    $scope.editQuestion = function () {
      $scope.loading = true
      var data = {}
      _.assign(data, $scope.question)
      if (data.tags) data.tags = _.map(data.tags, '_id')
      Questions.edit(data)
        .then(function (res) {
          AlertMessage.show('Pronto!', 'Resposta enviada com sucesso.')
          _.assign($scope.question, res.data)
          $state.go('main.question', { id: res.data._id })
        })
        .catch(function (err) {
          console.log(err)
          AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
        })
        .finally(function () {
          $scope.loading = false
        })
    }

    $scope.loadTags = function (query) {
      return Tag.findAll()
    }

    init()
  })
