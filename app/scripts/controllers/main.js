'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('MainCtrl', function ($scope, $location, $state, AuthenticationService, AlertMessage, Dashboard) {

    $scope.userInfo = AuthenticationService.getUserInfo() || null
    $scope.currentState = $state.current.name
    $scope.newUser = {}
    $scope.loading = false

    $scope.signup = function (userData) {
      if (!userData) var userData = $scope.newUser
      if (userData.name && userData.email && userData.username && userData.password) {
        $scope.loading = true
        AuthenticationService.signup(userData)
          .then(function (data) {
            if (data._id) {
              $scope.getUserInfo()
              $state.go('main.myprofile')
              AlertMessage.show('Usuário cadastrado com sucesso!', '', 'success')
            }
          })
          .catch(function (err) {
            if (err.status === 401) {
              AlertMessage.show('Usuário já existente.', 'Faça login ou tente novamente com informações diferentes.', 'warning')
            } else {
              AlertMessage.show('Algo de errado não está certo.', 'Recarregue a página e tente novamente.', 'warning')
            }
          })
          .finally(function () {
            $scope.loading = false
          })
      }
    }

    $scope.login = function (username, password) {
      $scope.loading = true
      var username = username || $scope.login.username
      var password = password || $scope.login.password

      AuthenticationService.login(username, password)
        .then(function (data) {
          $scope.getUserInfo()
          $state.go('main.mydashboard')
          if (data._id) {
            var msg = 'Login efetuado com sucesso!'
            if (data.name) {
              msg = 'Bem vindo novamente, ' + data.name + '!'
            }
            AlertMessage.show(msg, '', 'success')
          }
        })
        .catch(function (err) {
          if (err.status === 401) {
            AlertMessage.show('Usuário ou senha incorretos.', 'Tente novamente.', 'warning')
          } else {
            AlertMessage.show('Algo de errado não está certo.', 'Recarregue a página e tente novamente.', 'warning')
          }
        })
        .finally(function () {
          $scope.loading = false
        })
    }

    $scope.logout = function () {
      Dashboard.reset()
      AuthenticationService.logout()
    }

    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn()
    }

    $scope.getUserInfo = function () {
      $scope.userInfo = AuthenticationService.getUserInfo()
    }
  })
