'use strict'

/**
 * @ngdoc service
 * @name webAppApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('AuthenticationService', function ($http, $q, $cookies, $state, ENV, AlertMessage) {
    var userInfo

    function login (username, password) {
      var deferred = $q.defer()

      $http
        .post(ENV.apiEndpoint + '/login', {
          username: username,
          password: password
        })
        .then(loginSuccess(deferred), loginError(deferred))

      return deferred.promise
    }

    function fblogin (userData) {
      var deferred = $q.defer()
      $http
        .post(ENV.apiEndpoint + '/fblogin', {
          userId: isLoggedIn() ? getUserInfo()._id : null,
          fbId: userData.id
        })
        .then(function (res) {
          if (isLoggedIn()) {
            AlertMessage.show('Pronto! ', 'Seu perfil no facebook foi vinculado à sua conta.', 'success')
            $state.reload()
          } else {
            $state.go('main.mydashboard')
          }
          loginSuccess(deferred)(res)
        })
        .catch(function (err) {
          loginError(deferred)(err)
          if (err.status === 401) {
            $state.go('main.signup', { fbId: userData.id, email: userData.email, name: userData.name })
          }
        })

      return deferred.promise
    }

    function loginSuccess (prom) {
      return function (result) {
        setUserInfo(result.data)
        if (prom) {
          prom.resolve(getUserInfo())
        }
      }
    }

    function loginError (prom) {
      return function (error) {
        console.log(error)
        prom.reject(error)
      }
    }

    function signup (userData) {
      var deferred = $q.defer()
      $http
        .post(ENV.apiEndpoint + '/signup', {
          username: userData.username,
          password: userData.password,
          name: userData.name,
          fbId: userData.fbId,
          email: userData.email
        })
        .then(loginSuccess(deferred), loginError(deferred))

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
      userInfo = data
      $cookies.put('userInfo', JSON.stringify(userInfo))
      return userInfo
    }

    function isLoggedIn () {
      return userInfo && userInfo._id
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
      fblogin: fblogin,
      getUserInfo: getUserInfo,
      setUserInfo: setUserInfo,
      isLoggedIn: isLoggedIn,
      isAuthenticated: isAuthenticated,
      logout: logout
    }
  })
