'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionCtrl', function ($scope, $stateParams, Questions, Answers, User, AuthenticationService) {
    $scope.newAnswer = {}

    getQuestion($stateParams.id, function () {
      getAnswers()
    })

    function getQuestion (id, callback) {
      if (!id) id = $stateParams.id
      Questions.findOne(id).then(function (res) {
        $scope.question = res.data
        if (callback) callback(res)
      }, function (err) {
        console.log(err)
        if (callback) callback()
      })
    }

    function getAnswers (questionID, callback) {
      if (!questionID) questionID = $scope.question._id
      Answers.findByQuestion(questionID).then(function (res) {
        $scope.answers = res.data
        console.log(res.data)
        if (callback) callback(res)
      }, function (err) {
        console.log(err)
        if (callback) callback()
      })
    }

    function sendAnswer (data, callback) {
      Answers.sendAnswer(data).then(function (res) {
        if (callback) callback(res)
      }, function (err) {
        console.log(err)
        if (callback) callback()
      })
    }

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.sendAnswer = function () {
      var currentUser = AuthenticationService.getUserInfo()
      var data = {
        body: $scope.newAnswer.body,
        author: currentUser._id,
        question: $scope.question._id
      }
      sendAnswer(data, function (res) {
        getAnswers()
        console.log(res)
      })
    }

    $scope.teste = function () {
      AuthenticationService.isAuthenticated().then(function (res) {
        console.log(res)
      })
    }

  })
