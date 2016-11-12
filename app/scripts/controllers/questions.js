'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionsCtrl', function ($scope, $state, $stateParams, Questions, User, AuthenticationService) {

    function init () {
      var userId = $stateParams.userId || null
      var questionsParams = {}

      if (userId) {
        if (userId === 'my-questions') userId = AuthenticationService.getUserInfo()._id
        questionsParams.author = userId
      }

      getQuestions(questionsParams)
    }

    function getQuestions (params, callback) {
      Questions.findAll(params).then(function (res) {
        $scope.questions = res.data
        if (callback) callback()
      }, function (err) {
        console.log(err)
        if (callback) callback()
      })
    }

    init()

  })
