'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionsCtrl', function ($scope, $stateParams, Questions, User) {
    getQuestions()

    function getQuestions (callback) {
      Questions.findAll().then(function (res) {
        $scope.questions = res.data
        if (callback) callback()
      }, function (err) {
        console.log(err)
        if (callback) callback()
      })
    }

  })
