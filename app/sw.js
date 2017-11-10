/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, serviceworker, es6 */

'use strict';

/* eslint-disable max-len */

var applicationServerPublicKey = 'BLPfteECnB-dwfVxR1lg8cY33qsgT68siqs5Rf1QSARQrj9Z9NVnfJbG4xjd8IeA28sJB8WzjL02FZ-TR3Ov8sM';

/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
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

function getNotificationData (payload) {
  var data = JSON.parse(payload)

  var notificationTypes = {
    question_created: {
      title: 'Nova pergunta do seu interesse!',
      data: {
        url: 'https://bemybrain.github.io/#/questions/' + data.payload._id
      },
      body: data.payload.title
    },
    answer_created: {
      title: 'Alguém respondeu sua pergunta!',
      data: {
        url: 'https://bemybrain.github.io/#/questions/' + data.payload._id
      },
      body: data.payload.title
    }
  }
  return notificationTypes[data.type]
}

self.addEventListener('push', function(event) {
  var data = getNotificationData(event.data.text())
  var title = data.title;
  var options = {
    body: data.body,
    data: data.data,
    icon: 'images/beMyBrainLogo.png',
    badge: 'images/beMyBrainLogo.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || 'https://bemybrain.github.io/')
  );
});

self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.');
  var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription);
    })
  );
});
