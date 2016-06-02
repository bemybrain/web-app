'use strict'

/**
 * @ngdoc overview
 * @name webAppApp
 * @description
 * # webAppApp
 *
 * Main module of the application.
 */
angular
  .module('webAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/')
    //
    // Now set up the states
    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl: 'views/main.html',
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .state('question', {
        url: '/questions/:id',
        templateUrl: 'views/question.html',
        controller: 'QuestionsCtrl',
        resolve: {
          auth: ['$q', 'AuthenticationService', function ($q, AuthenticationService) {
            var userInfo = AuthenticationService.getUserInfo()

            if (userInfo) {
              return $q.when(userInfo)
            } else {
              return $q.reject({ authenticated: false })
            }
          }]
        }
      })
  }
    .run(['$rootScope', '$location', function ($rootScope, $location) {
      $rootScope.$on('$routeChangeSuccess', function (userInfo) {
        console.log(userInfo)
      })

      $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
          $location.path('/login')
        }
      })
    }]))
