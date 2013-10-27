'use strict';

/* App Module */

var mymoviesApp = angular.module('mymoviesApp', [
  'ngRoute',
  'mymoviesControllers',
  'mymoviesFilters',
  'mymoviesServices'
]);

mymoviesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'views/movie-list.html',
        controller: 'MovieListCtrl'
      }).
      when('/movies/:movieId', {
        templateUrl: 'views/movie-detail.html',
        controller: 'MovieDetailCtrl'
      }).
      otherwise({
        redirectTo: '/movies'
      });
  }]);
