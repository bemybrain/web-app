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

    var userId = $stateParams.userId || null
    var questionsParams = {}
    $scope.questions = []
    $scope.loading = false

    function init () {
      if (userId) {
        if (userId === 'my-questions') userId = AuthenticationService.getUserInfo()._id
        questionsParams.author = userId
      }

      getQuestions(questionsParams)
    }

    function getQuestions (params, callback) {
      $scope.loading = true
      Questions.findAll(params)
        .then(function (res) {
          $scope.questions = res.data
          if (callback) callback()
        })
        .catch(handleErr)
        .finally(function () {
          $scope.loading = false
        })
    }

    function deleteQuestion (id) {
      if (!id) return false
      Questions.delete(id)
        .then(function (res) {
          init()
          AlertMessage.show('Feito!', 'Pergunta apagada com sucesso.')
        })
        .catch(handleErr)
    }

    $scope.confirmDelete = function (id) {
      AlertMessage.confirm('delete-question', function () {
        deleteQuestion(id)
      })
    }

    $scope.loadMore = function () {
      $scope.loading = true
      var params = _.assign({}, questionsParams, {
        skip: $scope.questions.length
      })
      Questions.findAll(params)
        .then(function (res) {
          _.map(res.data, function (question) {
            $scope.questions.push(question)
          })
        })
        .catch(handleErr)
        .finally(function ( ) {
          $scope.loading = false
        })
    }

    function handleErr (err) {
      console.log(err)
      AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
    }

    init()

  })
