'use strict';

/**
 * @ngdoc directive
 * @name webAppApp.directive:mainSidebar
 * @description
 * # mainSidebar
 */
angular.module('webAppApp')
  .directive('mainSidebar', function (Tag, Dashboard, AuthenticationService) {
    return {
      templateUrl: '../../views/templates/main-sidebar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var user = AuthenticationService.getUserInfo()
        var tags = []
        var dashboard = Dashboard.get()

        function init () {
          scope.dashboard = dashboard
          scope.tags = tags
          getTags()
          setDashboard()
        }

        function getTags () {
          return Tag.findAll()
            .then(function (res) {
              scope.tags = tags = res.data
              return tags
            })
        }

        function setDashboard () {
          return Dashboard.set(user._id).catch(handleErr)
        }

        function handleErr (err) {
          console.log(err)
          AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
        }

        init()
      }
    };
  });
