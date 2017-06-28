'use strict';

/**
 * @ngdoc service
 * @name webAppApp.Tag
 * @description
 * # Tag
 * Service in the webAppApp.
 */
angular.module('webAppApp')
  .factory('Tag', function (ENV, $http, $q) {
    var tags = []

    function setData (data) {
      tags.length = 0
      _.forEach(data, function (tag) {
        tags.push(tag)
      })
      return tags
    }

    // Public API here
    return {
      reset: function () {
        tags.length = 0
      },
      getAll: function () {
        return tags
      },
      set: function () {
        var d = $q.defer()
        var request = $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/tags/'
        })
        request
          .then(function (res) {
            d.resolve(setData(res.data))
          })
          .catch(d.reject)
        return d.promise
      },
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
