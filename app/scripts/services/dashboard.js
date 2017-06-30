'use strict';

/**
 * @ngdoc service
 * @name webAppApp.Dashboard
 * @description
 * # Dashboard
 * Factory in the webAppApp.
 */
angular.module('webAppApp')
  .factory('Dashboard', function (ENV, $http, $q, ngDialog, AuthenticationService) {
    var dashboard = {}

    function levelUp (data) {
      var dialog = ngDialog.openConfirm({
        template: 'views/modals/level-up.html',
        showClose: true,
        trapFocus: true,
        closeByDocument: true,
        closeByEscape: true,
        data: data
      })
    }

    function setData (userId, data) {
      var currentUser = AuthenticationService.getUserInfo()
      var isCurrentUser = currentUser._id === userId
      var newData = {
        upvotes: data.upvotes,
        downvotes: data.downvotes,
        score: data.score,
        questions: data.questions,
        answers: data.answers,
        tags: data.tags,
        rank: data.rank,
        rules: data.rules
      }
      if (isCurrentUser && (dashboard.rank < newData.rank)) {
        levelUp(newData)
      }
      _.assign(dashboard, newData)
      return dashboard
    }

    // Public API here
    return {
      reset: function () {
        _.forEach(_.keys(dashboard), function (k) {
          delete dashboard[k]
        })
      },
      get: function () {
        return dashboard
      },
      set: function (userId) {
        var d = $q.defer()
        var request = $http({
          method: 'GET',
          url: ENV.apiEndpoint + '/dashboard/' + userId
        })
        request
          .then(function (res) {
            d.resolve(setData(userId, res.data))
          })
          .catch(d.reject)
        return d.promise
      }
    }
  });
