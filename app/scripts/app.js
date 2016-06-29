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
      .state('login', {
        url: '/login',
        controller: 'MainCtrl',
        templateUrl: 'views/login.html',
      })
      .state('logout', {
        url: '/logout',
        controller: 'MainCtrl',
        resolve: {
          logout: logout
        }
      })
      .state('questions', {
        url: '/questions',
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .state('question', {
        url: '/questions/:id',
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl',
        resolve: { auth: isAuthenticated }
      })
      .state('newquestion', {
        url: '/new-question',
        templateUrl: 'views/new-question.html',
        controller: 'NewQuestionCtrl',
        resolve: { auth: isAuthenticated }
      })
  })
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error.authenticated === false) {
        $state.go('login', {}, { reload: true })
      }
    })
  }])
  .run(['$rootScope', function ($rootScope, $location) {
    $rootScope.$on('$stateChangeSuccess', function () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    })
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true
  }])

function isAuthenticated ($q, AuthenticationService) {
  var userInfo = AuthenticationService.getUserInfo()
  if (userInfo) {
    return $q.when(userInfo)
  } else {
    return $q.reject({ authenticated: false })
  }
}

function logout ($q, AuthenticationService, $state) {
  AuthenticationService.logout().then(function () {
    $state.go('login', {}, { reload: true })
  })
}
