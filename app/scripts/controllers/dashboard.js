'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:NewQuestionCtrl
* @description
* # NewQuestionCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('DashboardCtrl', function ($scope, $state, AuthenticationService, AlertMessage, Dashboard, Tag) {

    var user = AuthenticationService.getUserInfo()
    var tags = []
    var chart = {
      labels: [],
      data: [],
      options: {
        scales: {
         xAxes: [{
           gridLines: { display: false }
         }],
         yAxes: [{
           gridLines: { display:false }
         }]
       },
      }
    }

    function init () {
      $scope.user = user
      $scope.chart = chart

      if (user && user._id) {
        getTags()
          .then(function () {
            getDashboard(user._id)
            getRankRules(user._id)
          }, handleErr)
      }
    }

    function getTags () {
      return Tag.findAll()
        .then(function (res) {
          tags = res.data
          return tags
        })
    }

    function getRankRules () {
      Dashboard.getRules().then(function (res) {
        $scope.rankRules = res.data
      }, handleErr)
    }

    function getDashboard (userId) {
      Dashboard.get(userId).then(setDashboard, handleErr)
    }

    function setDashboard (res) {
      $scope.dashboard = res.data
      setChart(res.data)
    }

    function setChart (data) {
      chart.labels = _.map(data.tags, function (val, key) {
        var tagIndex = _.findIndex(tags, { '_id': key })
        return tags[tagIndex].name
      })
      chart.data = _.map(data.tags, function (val, key) {
        return val
      })
    }

    function handleErr (err) {
      console.log(err)
      AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
    }

    init()
})
