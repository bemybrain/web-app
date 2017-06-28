'use strict';

/**
 * @ngdoc directive
 * @name webAppApp.directive:mainSidebar
 * @description
 * # mainSidebar
 */
angular.module('webAppApp')
  .directive('mainSidebar', function (Tag, Dashboard, AuthenticationService, AlertMessage) {
    return {
      templateUrl: '../../views/templates/main-sidebar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var user = AuthenticationService.getUserInfo()
        var tags = Tag.getAll()
        var dashboard = Dashboard.get()

        function init () {
          scope.dashboard = dashboard
          scope.tags = tags
          setTags()
          setDashboard()
        }
        function setTags () {
          return Tag.set().catch(handleErr)
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
