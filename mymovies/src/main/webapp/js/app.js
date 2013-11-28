'use strict';

/* App Module */

var mymoviesApp = angular.module('mymoviesApp', [
  'ngRoute',
  'mymoviesControllers',
  'mymoviesFilters',
  'mymoviesDirectives',
  'mymoviesServices'
]);

mymoviesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'views/movie-list.html',
        controller: 'MovieListCtrl'
      }).
      otherwise({
        redirectTo: '/movies'
      });
  }]);

mymoviesApp.run(function ($rootScope) {
    $rootScope.applicationTitle = 'My Favorite Movies !'
});
