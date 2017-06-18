'use strict';

/**
 * @ngdoc directive
 * @name webAppApp.directive:mainSidebar
 * @description
 * # mainSidebar
 */
angular.module('webAppApp')
  .directive('mainSidebar', function (Tag) {
    return {
      templateUrl: '../../views/templates/main-sidebar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var tags = []

        function init () {
          scope.tags = tags
          getTags()
        }

        function getTags () {
          return Tag.findAll()
            .then(function (res) {
              scope.tags = tags = res.data
              return tags
            })
        }

        init()
      }
    };
  });
