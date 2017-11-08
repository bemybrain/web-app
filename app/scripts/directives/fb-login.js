'use strict';

/**
 * @ngdoc directive
 * @name webAppApp.directive:fbLogin
 * @description
 * # voteBox
 */
angular.module('webAppApp')
  .directive('fbLogin', function ($window) {
    return {
      templateUrl: '../../views/templates/fb-login.html',
      restrict: 'E',
      scope: {},
      link: function postLink(scope, element, attrs) {
        if ($window.FB) {
          $window.FB.XFBML.parse(element[0]);
        }
      }
    };
  });
