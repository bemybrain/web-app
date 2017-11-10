'use strict';

/**
 * @ngdoc service
 * @name webAppApp.AlertMessage
 * @description
 * # AlertMessage
 * Service in the webAppApp.
 */
angular.module('webAppApp')
  .service('PushNotifications', function (ENV, $http) {

    var applicationServerPublicKey = 'BLPfteECnB-dwfVxR1lg8cY33qsgT68siqs5Rf1QSARQrj9Z9NVnfJbG4xjd8IeA28sJB8WzjL02FZ-TR3Ov8sM'
    var isSubscribed = false;
    var swRegistration = null;
    var hasSW = ('serviceWorker' in navigator && 'PushManager' in window);

    function urlB64ToUint8Array (base64String) {
      var padding = '='.repeat((4 - base64String.length % 4) % 4);
      var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    function subscribeOnServer (userId, subscription) {
      if (hasSW && userId && subscription) {
        var prom = $http({
          method: 'POST',
          url: ENV.apiEndpoint + '/push',
          data: {
            userId: userId,
            subscription: JSON.stringify(subscription)
          }
        })
        return prom
          .then(function (res) {
            console.log(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }

    function unsubscribeOnServer (userId) {
      if (hasSW && userId) {
        var prom = $http({
          method: 'DELETE',
          url: ENV.apiEndpoint + '/push/' + userId
        })
        return prom
          .then(function (res) {
            console.log(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }

    function subscribeUser (userId) {
      if (hasSW) {
        var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
        swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then(function(subscription) {
          subscribeOnServer(userId, subscription)
          isSubscribed = true;
        })
        .catch(function(err) {
          console.log('Failed to subscribe the user: ', err);
        });
      }
    }

    function unsubscribeUser(userId) {
      if (hasSW) {
        swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          if (subscription) {
            return subscription.unsubscribe();
          }
        })
        .catch(function(error) {
          console.log('Error unsubscribing', error);
        })
        .then(function() {
          unsubscribeOnServer(userId)
          console.log('User is unsubscribed.');
          isSubscribed = false;
        });
      }
    }

    function init () {
      if (hasSW) {
        console.log('Service Worker and Push is supported')
        navigator.serviceWorker.register('sw.js')
        .then(function(swReg) {
          console.log('Service Worker is registered', swReg)
          swRegistration = swReg
        })
        .catch(function(error) {
          console.error('Service Worker Error', error)
        })
      } else {
        console.warn('Push messaging is not supported')
      }
    }

    return {
      init: init,
      subscribeUser: subscribeUser,
      unsubscribeUser: unsubscribeUser
    }
  });
