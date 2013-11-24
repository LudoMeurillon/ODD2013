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
      // TODO - 1 : ajouter une route '/movies/:movieId'
      // la vue associée est 'views/movie-detail.html'
      // le controlleur est 'MovieDetailCtrl'
      otherwise({
        redirectTo: '/movies'
      });
  }]);

mymoviesApp.run(function ($rootScope) {
    $rootScope.applicationTitle = 'My Favorite Movies !'
});
