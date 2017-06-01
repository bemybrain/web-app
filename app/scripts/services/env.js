'use strict'

/**
 * @ngdoc service
 * @name webAppApp.ENV
 * @description
 * # ENV
 * Constant in the webAppApp.
 */
angular.module('webAppApp')
  .constant('ENV', {
    name: 'production',
    apiEndpoint: 'http://v0-bemybrain.rhcloud.com/api'
    // name: 'development',
    // apiEndpoint: 'http://localhost:3000/api'
  })
