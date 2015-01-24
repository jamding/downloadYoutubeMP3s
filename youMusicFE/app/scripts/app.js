'use strict';

/**
 * @ngdoc overview
 * @name youMusicApp
 * @description
 * # youMusicApp
 *
 * Main module of the application.
 */
angular
  .module('youMusicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
