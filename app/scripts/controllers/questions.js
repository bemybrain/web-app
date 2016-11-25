'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('QuestionsCtrl', function ($scope, $state, $stateParams, Questions, User, AuthenticationService, AlertMessage) {

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
        AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
      })
    }

    function deleteQuestion (id) {
      if (!id) return false
      Questions.delete(id).then(function (res) {
        init()
        AlertMessage.show('Feito!', 'Pergunta apagada com sucesso.')
      }, function (err) {
        console.log(err)
        AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
      })
    }

    $scope.confirmDelete = function (id) {
      AlertMessage.confirm('delete-question', function () {
        deleteQuestion(id)
      })
    }

    init()

  })
