'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers
	.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
			$scope.movies = Movie.query();
			$scope.categories = ["Thriller","Drama","Action","History"];
			$scope.filters = ["Thriller"];
			$scope.actorsearch = "";
			$scope.isSelected = function(category){
				return ($.inArray(category, $scope.filters) > -1);
			};
			$scope.filter = function(category){
				if($scope.isSelected(category)){
					var index = $scope.filters.indexOf(category);
					$scope.filters.splice(index,1);
				}else{
					$scope.filters.push(category);
				}
			}
		}])
	.filter('selectedGenres', function() {
	    return function( items, filters ) {
	      var filtered = [];
	      angular.forEach(items, function(item) {
	      	var currentGenres = item.genres;
	      	if(currentGenres){
		      	angular.forEach(filters, function(filter){
		      		if($.inArray(filter, currentGenres) > -1){
		      			if($.inArray(item, filtered) == -1){
		      				filtered.push(item);
		      			}
		      		}
		      	});
		    }
	      });
	      return filtered;
	    };
	})
	.filter('actorSearch', function() {
	    return function( items, search ) {
	      if(search == ""){
	      	return items.concat([]);
	      }
	      console.log('actorSearch', search, items);
	      var filtered = [];
	      angular.forEach(items, function(item) {
	      	var actors = item.actors;
	      	if(actors){
		      	angular.forEach(actors, function(actor){
		      		var index = actor.toLowerCase().search(search.toLowerCase());
		      		if( index > -1){
	      				console.log('actorSearch match', search, actor);
		      			if($.inArray(item, filtered) == -1){
		      				filtered.push(item);
		      			}
		      		}
		      	});
		    }
	      });
	      return filtered;
	    };
	})
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

