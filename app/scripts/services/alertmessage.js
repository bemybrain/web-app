'use strict';

/**
 * @ngdoc service
 * @name webAppApp.AlertMessage
 * @description
 * # AlertMessage
 * Service in the webAppApp.
 */
angular.module('webAppApp')
  .service('AlertMessage', function (ngDialog, $timeout, $alert) {
    function show (title, msg, type) {
      var alert = $alert({
        title: title,
        content: msg,
        dismissable: true,
        placement: 'bottom-right',
        type: type || 'info',
        container: '#alerts-container',
        show: true
      })
      $timeout(function () {
        alert.hide()
      }, 5000)
      return alert
    }

    function confirm (template, callback) {
      ngDialog.close()
      var dialog = ngDialog.openConfirm({
        template: 'views/modals/' + template + '.html',
        // disableAnimation: true,
        showClose: true,
        trapFocus: true,
        closeByDocument: true,
        closeByEscape: true
      }).then(function () {
        if (callback) callback()
      })
      return dialog
    }

    return {
      show: show,
      confirm: confirm
    }
  });
