'use strict'

/**
 * @ngdoc function
 * @name webAppApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the webAppApp
 */
angular.module('webAppApp')
  .controller('UserCtrl', function ($scope, $state, User, AuthenticationService, Tag, AlertMessage) {
    var tags = Tag.getAll()
    $scope.tags = tags
    $scope.profile = angular.copy(AuthenticationService.getUserInfo()) || {}

    function init () {
      setTags()
    }

    function setTags () {
      return Tag.set().catch(handleErr)
    }

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.getUserInfo = function () {
      $scope.profile = AuthenticationService.getUserInfo()
    }

    $scope.updateProfile = function (id, data) {
      $scope.loading = true
      if (!id) id = $scope.profile._id
      if (!data) data = {}
      data.name = data.name || $scope.profile.name
      data.username = data.username || $scope.profile.username
      data.email = data.email || $scope.profile.email
      data.tags = data.tags || $scope.profile.tags
      if (data.tags) data.tags = _.map(data.tags, '_id')
      User.update(id, data)
        .then(function (res) {
          AuthenticationService.setUserInfo(res.data)
          AlertMessage.show('Usuário alterado com sucesso!')
          $state.go('main.questions')
        })
        .catch(function (err) {
          AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
        })
        .finally(function (err) {
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
