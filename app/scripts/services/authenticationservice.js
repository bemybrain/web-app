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
        console.log(error)
        deferred.reject(error)
      })

      return deferred.promise
    }

    function logout () {
      var deferred = $q.defer()

      $http({
        method: 'GET',
        url: ENV.apiEndpoint + '/logout',
        headers: {
          'access_token': userInfo.accessToken
        }
      }).then(function (result) {
        $window.sessionStorage['userInfo'] = null
        userInfo = null
        deferred.resolve(result)
      }, function (error) {
        deferred.reject(error)
      })

      return deferred.promise
    }

    function getUserInfo () {
      return userInfo
    }

    function init () {
      if ($window.sessionStorage['userInfo']) {
        userInfo = JSON.parse($window.sessionStorage['userInfo'])
      }
    }

    init()

    return {
      login: login,
      getUserInfo: getUserInfo,
      logout: logout
    }
  })
