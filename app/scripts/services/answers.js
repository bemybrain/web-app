'use strict';

/**
 * @ngdoc service
 * @name webAppApp.Answers
 * @description
 * # Answers
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('Answers', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
