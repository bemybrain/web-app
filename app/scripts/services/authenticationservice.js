'use strict'

/**
 * @ngdoc service
 * @name webAppApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('AuthenticationService', function ($http, $q, $cookies, ENV) {
    var userInfo

    function login (username, password) {
      var deferred = $q.defer()

      $http.post(ENV.apiEndpoint + '/login', {
        username: username,
        password: password
      }).then(function (result) {
        console.log(result);
        userInfo = result.data
        $cookies.put('userInfo', JSON.stringify(userInfo))
        deferred.resolve(userInfo)
      }, function (error) {
        console.log(error)
        deferred.reject(error)
      })

      return deferred.promise
    }

    function signup (userData) {
      var deferred = $q.defer()
      $http.post(ENV.apiEndpoint + '/signup', {
        username: userData.username,
        password: userData.password,
        name: userData.name,
        email: userData.email
      }).then(function (result) {
        userInfo = result.data
        setUserInfo(userInfo)
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
        url: ENV.apiEndpoint + '/logout'
      }).then(function (result) {
        $cookies.remove('userInfo')
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

    function setUserInfo (data) {
      $cookies.put('userInfo', JSON.stringify(data))
      return userInfo
    }

    function isLoggedIn () {
      if (userInfo && userInfo !== null) {
        return true
      } else {
        return false
      }
    }

    function init () {
      var userInfoCookies = $cookies.get('userInfo')
      if (userInfoCookies) {
        userInfo = JSON.parse(userInfoCookies)
      }
    }

    function isAuthenticated () {
      var deferred = $q.defer()

      $http.get(ENV.apiEndpoint + '/loggedin')
        .then(function (result) {
          deferred.resolve(result)
        }, function (error) {
          console.log(error)
          deferred.reject(error)
        })

      return deferred.promise
    }

    init()

    return {
      signup: signup,
      login: login,
      getUserInfo: getUserInfo,
      setUserInfo: setUserInfo,
      isLoggedIn: isLoggedIn,
      isAuthenticated: isAuthenticated,
      logout: logout
    }
  })
