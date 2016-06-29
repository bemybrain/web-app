'use strict'

/**
 * @ngdoc service
 * @name webAppApp.Answers
 * @description
 * # Answers
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('Answers', function (ENV, $http) {
    // Public API here
    return {
      findByQuestion: function (question) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/answers',
          params: { question: question }
        })
      },
      findAll: function () {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/answers'
        })
      },
      findOne: function (id) {
        return $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/answers/' + id
        })
      },
      sendAnswer: function (data) {
        return $http({
          method: 'POST',
          url: ENV.apiEndpoint + '/answers',
          data: {
            body: data.body,
            author: data.author,
            question: data.question
          }
        })
      }
    }
  })
