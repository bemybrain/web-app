'use strict';

/**
 * @ngdoc directive
 * @name webAppApp.directive:userAvatar
 * @description
 * # userAvatar
 */
angular.module('webAppApp')
  .directive('userAvatar', function () {
    return {
      templateUrl: '../../views/templates/user-avatar.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      link: function postLink(scope, element, attrs) {
        // element.text('this is the userAvatar directive');
      }
    };
  });
