'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionsCtrl', function ($scope, $stateParams, Questions) {
    if (!$stateParams.id) {
      getQuestions()
    } else {
      getQuestion($stateParams.id)
    }

    function getQuestions () {
      Questions.findAll().then(function (res) {
        $scope.questions = res.data
        console.log($scope.questions)
      }, function (err) {
        console.log(err)
      })
    }

    function getQuestion (id) {
      if (!id) id = $stateParams.id
      Questions.findOne(id).then(function (res) {
        $scope.question = res.data
        console.log($scope.question)
      }, function (err) {
        console.log(err)
      })
    }

  })
