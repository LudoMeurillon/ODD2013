'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers
	.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
			//Films récupérés par le service Movie
			$scope.movies = Movie.query(function(){
				//Initialisation des tags a partir de la liste de films récupérés.
				var cats = [];
				angular.forEach($scope.movies , function(movie){
					angular.forEach(movie.genres, function(genre){
						cats[genre]=true;
					});
				});
				$scope.categories = Object.keys(cats);
			});
			//Filtres d'affichage des films (tags)
			$scope.filters = [];
			//Critère de recherche de fims sur la base de nom d'acteurs
			$scope.actorsearch = "";
			//Renvoie vrai si le tag 'category' est selectionné
			$scope.isSelected = function(category){
				return ($.inArray(category, $scope.filters) > -1);
			};
			//Selection/Deselectionne un filtre tag
			$scope.filter = function(category){
				if($scope.isSelected(category)){
					var index = $scope.filters.indexOf(category);
					$scope.filters.splice(index,1);
				}else{
					$scope.filters.push(category);
				}
			};
			$scope.tagStyle = function(){
				if($scope.filters.length > 0){
					return "tags-button selected"
				}
				return "tags-button"
			}
		}
	])
	/*
		Filtre permettant de selectionner les films qui 
		correspondent aux tags selectionnés.
	*/
	.filter('selectedGenres', function() {
	    return function( items, filters ) {
	      var filtered = [];
	      //Pas de filtre selectionné, on affiche tout
	      if(filters.length == 0){
	      	return items;
	      }
	      angular.forEach(items, function(item) {
	      	//On copie les filtres selectionnés pour les eliminer 
	      	//à chaque correspondance pour le film testé
	      	var searchedGenres = [];
	      	angular.forEach(filters, function(filter){
	      		searchedGenres[filter]=false;
	      	});

	      	var currentGenres = item.genres;
	      	if(currentGenres){
		      	angular.forEach(filters, function(filter){
		      		if(currentGenres.indexOf(filter) > -1){
		      			delete searchedGenres[filter];
		      		}
		      	});
		    }
		    if(Object.keys(searchedGenres).length == 0){
		    	filtered.push(item);
			}
	      });
	      return filtered;
	    };
	})
	/*
		Filtre permettant de selectionner les films dont un des acteurs
		a un nom qui correspond au critère de recherche (comparaison en miniscule)
	*/
	.filter('actorSearch', function() {
	    return function( items, search ) {
	      if(search == ""){
	      	return items;
	      }
	      console.log('actorSearch', search, items);
	      var filtered = [];
	      var criteria = search.toLowerCase();
	      angular.forEach(items, function(item) {
	      	var actors = item.actors;
	      	if(actors){
		      	angular.forEach(actors, function(actor){
		      		if( actor.toLowerCase().search(criteria) > -1){
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
	/*
		Directive permettant d'afficher une note avec des étoiles

		Exemple : pour afficher une note de 5.2/10 avec 20 étoiles
		
			<vote value='5.2' max='10' stars='20'/>
	*/
	.directive('vote', function(){
			return {
		    	restrict: 'E',
		    	scope:{
		    		vote:"=value",
		    		max:"=max",
		    		stars:"=stars"
		    	},
		    	link : function(scope){
		    		//Genere un tableau de 1 à max [1,2,3 .... max]
		    		scope.range = function(max, $scope){
		    			var array = [];
		    			for (var i = 1; i <= max; i++) {
		    				array.push(i);
		    			}
		    			return array;
		    		};

		    		//Donne la classe css d'une etoile selon sa place et le vote
		    		scope.getStarClass = function(starIndex){
		    			var starValue = scope.max / scope.stars;
		    			if(starIndex * starValue > scope.vote){
		    				//Etoile vide
		    				return "glyphicon glyphicon-star-empty"; 
		    			}
		    			//Etoile pleine
		    			return "glyphicon glyphicon-star"; 
		    		};

		    	},
		    	template: "<ul><li ng-repeat=\"i in range(stars)\"><i ng-class=\"getStarClass(i)\"/></li></ul>"
		    };
		});



mymoviesControllers.controller('MovieDetailCtrl', [ '$scope', '$routeParams','Movie', 
	function($scope, $routeParams, Movie) {
			$scope.id = $routeParams.movieId;
			Movie.get(
					{
						movieId : $routeParams.movieId
					}, 
					function(movie) {
						$scope.movie = movie;
					});
		} ]);

