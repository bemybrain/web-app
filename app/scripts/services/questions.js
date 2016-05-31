'use strict'

/**
 * @ngdoc service
 * @name webAppApp.Questions
 * @description
 * # Questions
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('Questions', function (ENV, $http) {
    // Public API here
    return {
      findAll: function () {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/questions'
        })
      },
      findOne: function (id) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/questions/' + id
        })
      }
    }
  })
