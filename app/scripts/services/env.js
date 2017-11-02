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
    apiEndpoint: 'https://5ov38s6-bemybrain.wedeploy.io'
    // name: 'development',
    // apiEndpoint: 'http://localhost:3000/api'
  })
