'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
			$scope.movies = Movie.query();
//			$scope.orderProp = 'age';
		} ]);



mymoviesControllers.controller('MovieDetailCtrl', [ '$scope', '$routeParams',
		'Movie', function($scope, $routeParams, Movie) {
			$scope.Movie = Movie.get({
					movieId : $routeParams.movieId
					}, function(Movie) {
						$scope.mainImageUrl = Movie.images[0];
					});	

//			$scope.setImage = function(imageUrl) {
//				$scope.mainImageUrl = imageUrl;
//			}
		} ]);
