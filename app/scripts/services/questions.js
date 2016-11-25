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
      create: function (data) {
        return $http({
          method: 'POST',
          url: ENV.apiEndpoint + '/questions',
          data: {
            title: data.title,
            body: data.body,
            author: data.author,
            tags: data.tags
          }
        })
      },
      edit: function (question) {
        return $http({
          method: 'PUT',
          url: ENV.apiEndpoint + '/questions/' + question._id,
          data: {
            title: question.title,
            body: question.body,
            tags: question.tags,
            status: question.status
          }
        })
      },
      findAll: function (params) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/questions',
          params: params || {}
        })
      },
      findOne: function (id) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/questions/' + id
        })
      },
      delete: function (id) {
        return $http({
          method: 'DELETE',
          url: ENV.apiEndpoint + '/questions/' + id
        })
      }
    }
  })
