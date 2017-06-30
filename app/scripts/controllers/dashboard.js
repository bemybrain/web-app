'use strict'

/**
* @ngdoc function
* @name webAppApp.controller:NewQuestionCtrl
* @description
* # NewQuestionCtrl
* Controller of the webAppApp
*/
angular.module('webAppApp')
  .controller('DashboardCtrl', function ($scope, $state, $stateParams, AuthenticationService, AlertMessage, Dashboard, Tag, User) {
    var currentUser = AuthenticationService.getUserInfo()
    var userId = $stateParams.userId || currentUser._id
    var dashboard = Dashboard.get()
    var tags = Tag.getAll()
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
      $scope.chart = chart
      $scope.dashboard = dashboard

      if (userId) {
        getUser(userId)
        setTags()
          .then(function () {
            setDashboard(userId)
          }, handleErr)
      }
    }

    function getUser (id) {
      return User.findOne(id)
        .then(function (res) {
          $scope.user = res.data
          return $scope.user
        })
    }

    function setTags () {
      return Tag.set()
    }

    function setDashboard (userId) {
      return Dashboard.set(userId).then(function (data) {
        setChart(data)
      }, handleErr)
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
