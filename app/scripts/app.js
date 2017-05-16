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
    'ui.router',
    'ngTagsInput',
    'ngDialog',
    'ngAnimate',
    'mgcrea.ngStrap',
    'ngLodash',
    'chart.js'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    // the unknown
    $urlRouterProvider.otherwise('/')
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // })


    // Now set up the states
    $stateProvider
      .state('main', {
        abstract: true,
        template: '<ui-view/>',
        controller: 'MainCtrl'
      })
      .state('main.home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('main.questions', {
        url: '/questions?userId',
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .state('main.question', {
        url: '/questions/:id',
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl',
        resolve: { auth: isAuthenticated }
      })
      .state('main.editquestion', {
        url: '/questions/:id/edit',
        templateUrl: 'views/edit-question.html',
        controller: 'QuestionCtrl',
        resolve: { auth: isAuthenticated }
      })
      .state('main.newquestion', {
        url: '/new-question',
        templateUrl: 'views/new-question.html',
        controller: 'NewQuestionCtrl',
        resolve: { auth: isAuthenticated }
      })
      .state('main.myprofile', {
        url: '/my-profile',
        templateUrl: 'views/my-profile.html',
        controller: 'UserCtrl',
        resolve: { auth: isAuthenticated }
      })
      .state('main.login', {
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
      .state('main.dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/dashboard.html',
      })
  })
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error.authenticated === false) {
        $state.go('main.login', {}, { reload: true })
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
    $state.go('main.login', {}, { reload: true })
  })
}
