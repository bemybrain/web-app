'use strict';

/**
 * @ngdoc service
 * @name webAppApp.Tag
 * @description
 * # Tag
 * Service in the webAppApp.
 */
angular.module('webAppApp')
  .factory('Tag', function (ENV, $http) {
    // Public API here
    return {
      create: function (data) {
        return $http({
          method: 'POST',
          url: ENV.apiEndpoint + '/tags',
          data: {
            name: data.name,
            related: data.related || []
          }
        })
      },
      findAll: function (params) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/tags',
          params: params || {}
        })
      },
      findOne: function (id) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/tags/' + id
        })
      },
      delete: function (id) {
        return $http({
          method: 'DELETE',
          url: ENV.apiEndpoint + '/tags/' + id
        })
      }
    }
  })
