'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionCtrl', function ($scope, $stateParams, Questions, Answers, User, AuthenticationService, AlertMessage) {
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
      Answers.sendAnswer(data).then(function (res) {
        $scope.loading = false
        AlertMessage.show('Pronto!', 'Resposta enviada com sucesso.', 'danger')
        if (callback) callback(res)
      }, function (err) {
        console.log(err)
        $scope.loading = false
        AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
      })
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
        $scope.newAnswer = {}
        getAnswers()
        console.log(res)
      })
    }

    init()
  })
