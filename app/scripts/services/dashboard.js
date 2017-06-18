'use strict';

/**
 * @ngdoc service
 * @name webAppApp.Dashboard
 * @description
 * # Dashboard
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('Dashboard', function (ENV, $http) {
    // Public API here
    return {
      get: function (userId) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/dashboard/' + userId
        })
      },
      getRules: function () {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/dashboard/rules'
        })
      }
    }
  });
