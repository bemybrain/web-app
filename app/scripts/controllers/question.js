'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionCtrl', function ($scope, $stateParams, Questions, Answers, User) {
    getQuestion($stateParams.id, function () {
      getAnswers()
    })

    function getQuestion (id, callback) {
      if (!id) id = $stateParams.id
      Questions.findOne(id).then(function (res) {
        $scope.question = res.data
        if (callback) callback()
      }, function (err) {
        console.log(err)
        if (callback) callback()
      })
    }

    function getAnswers (questionID, callback) {
      if (!questionID) questionID = $scope.question._id
      Answers.findByQuestion(questionID).then(function (res) {
        $scope.answers = res.data
        if (callback) callback()
      }, function (err) {
        console.log(err)
        if (callback) callback()
      })
    }
  })
