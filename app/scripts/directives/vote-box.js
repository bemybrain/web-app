'use strict';

/**
 * @ngdoc directive
 * @name webAppApp.directive:voteBox
 * @description
 * # voteBox
 */
angular.module('webAppApp')
  .directive('voteBox', function ($q, Answers, Questions, AlertMessage, AuthenticationService) {
    return {
      templateUrl: '../../views/templates/vote-box.html',
      restrict: 'E',
      scope: {
        question: '=',
        answer: '='
      },
      link: function postLink(scope, element, attrs) {
        var providerType = scope.answer ? 'answer' : 'question'
        var provider = scope[providerType]
        var currentUser = AuthenticationService.getUserInfo()
        var userId = currentUser ? currentUser._id : null

        function init () {
          scope.provider = provider
          scope.upvote = upvote
          scope.downvote = downvote
          scope.hasVoted = hasVoted
        }

        function hasVoted (what) {
          var votes = []
          if (what) {
            if (what === 'downvote' || what === 'down') {
              votes = provider.downvotes
            } else {
              votes = provider.upvotes
            }
          } else {
            votes = provider.upvotes.concat(provider.downvotes)
          }
          return votes.indexOf(userId) !== -1
        }

        function handleUpvote () {
          var upvotesIndex = provider.upvotes.indexOf(userId)
          var downvotesIndex = provider.downvotes.indexOf(userId)
          var hasUpvoted = upvotesIndex !== -1
          var hasDownvoted = downvotesIndex !== -1
          if (hasUpvoted) {
            provider.upvotes.splice(upvotesIndex, 1)
          } else {
            if (hasDownvoted) {
              provider.downvotes.splice(downvotesIndex, 1)
            }
            provider.upvotes.push(userId)
          }
        }

        function handleDownvote () {
          var upvotesIndex = provider.upvotes.indexOf(userId)
          var downvotesIndex = provider.downvotes.indexOf(userId)
          var hasUpvoted = upvotesIndex !== -1
          var hasDownvoted = downvotesIndex !== -1
          if (hasDownvoted) {
            provider.downvotes.splice(downvotesIndex, 1)
          } else {
            if (hasUpvoted) {
              provider.upvotes.splice(upvotesIndex, 1)
            }
            provider.downvotes.push(userId)
          }
        }

        function upvote () {
          var prom
          var oldProvider = angular.copy(provider)
          handleUpvote()

          if (providerType === 'answer') {
            prom = Answers.upvote(provider._id)
          } else {
            prom = Questions.upvote(provider._id)
          }
          prom.catch(handleErr)
          return prom

          function handleErr (err) {
            _.assign(provider, oldProvider)
            AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
            console.log(err)
          }
        }

        function downvote () {
          var prom
          var oldProvider = angular.copy(provider)
          handleDownvote()

          if (providerType === 'answer') {
            prom = Answers.downvote(provider._id)
          } else {
            prom = Questions.downvote(provider._id)
          }
          prom.catch(handleErr)
          return prom

          function handleErr (err) {
            _.assign(provider, oldProvider)
            AlertMessage.show('Ops!', 'Ocorreu um erro inesperado.', 'danger')
            console.log(err)
          }
        }

        init()
      }
    };
  });
