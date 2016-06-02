'use strict';

/**
 * @ngdoc service
 * @name webAppApp.User
 * @description
 * # User
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('User', function () {
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
