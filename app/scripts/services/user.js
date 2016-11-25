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
      },
      update: function (id, data) {
        return $http({
          method: 'PUT',
          url: ENV.apiEndpoint + '/users/' + id,
          data: {
            name: data.name,
            username: data.username,
            email: data.email,
            tags: data.tags
          }
        })
      }
    }
  })
