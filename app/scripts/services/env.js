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
    apiEndpoint: 'https://i2zgdwp-bemybrain.wedeploy.io'
    // name: 'development',
    // apiEndpoint: 'http://localhost:3000/api'
  })
