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
    apiEndpoint: 'http://api-bemybrain.rhcloud.com/api'
  })
