'use strict'

/**
 * @ngdoc service
 * @name webAppApp.User
 * @description
 * # User
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('User', function (ENV, $http) {
    // Public API here
    return {
      findAll: function () {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/users'
        })
      },
      findOne: function (id) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/users/' + id
        })
      }
    }
  })
