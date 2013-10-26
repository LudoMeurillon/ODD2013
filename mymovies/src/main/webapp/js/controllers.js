'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers
	.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
			$scope.movies = Movie.query();
		}])
	.directive('vote', function(){
			return {
		    	restrict: 'E',
		    	scope:{
		    		vote:"=value",
		    		max:"=max",
		    		stars:"=stars",
		    		range:"&"
		    	},
		    	link : function(scope){
		    		scope.range = function(max){
		    			var array = [];
		    			for (var i = 1; i <= max; i++) {
		    				array.push(i);
		    			}
		    			return array;
		    		}
		    	},
		    	templateUrl: 'templates/vote.html'
		    };
		});



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

