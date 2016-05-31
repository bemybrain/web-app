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
        controller: 'QuestionsCtrl'
      })
  })
