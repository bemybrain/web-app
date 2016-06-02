'use strict'

/**
 * @ngdoc service
 * @name webAppApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('AuthenticationService', function ($http, $q, $window, ENV) {
    var userInfo

    function login (username, password) {
      var deferred = $q.defer()

      $http.post(ENV.apiEndpoint + '/login', {
        username: username,
        password: password
      }).then(function (result) {
        userInfo = {
          accessToken: result.data.access_token,
          username: result.data.username
        }
        $window.sessionStorage['userInfo'] = JSON.stringify(userInfo)
        deferred.resolve(userInfo)
      }, function (error) {
        deferred.reject(error)
      })

      return deferred.promise
    }

    function getUserInfo () {
      return userInfo
    }

    return {
      login: login,
      getUserInfo: getUserInfo
    }
  })
