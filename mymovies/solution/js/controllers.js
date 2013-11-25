'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers
	.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
			// positionne le titre de la page
			$scope.pageTitle = 'My Favorite Movies'
		
			//Films récupérés par le service Movie
			$scope.movies = Movie.query();			
			
			//Critère de recherche de films sur la base de nom d'acteurs
			$scope.actor = "";

		}
	])

	
	
	/*
		Filtre permettant de selectionner les films dont un des acteurs
		a un nom qui correspond au critère de recherche (comparaison en miniscule)
	*/
	.filter('actorSearch', function() {
	    return filterByActorName;
	});



mymoviesControllers.controller('MovieDetailCtrl', [ '$scope', '$routeParams','Movie',
	function($scope, $routeParams, Movie) {

			$scope.pageTitle = 'My Movie Details';
			$scope.id = $routeParams.movieId;
			
			// envoie une requete GET vers le serveur en passant
			// l'identifiant de film a obtenir
			Movie.get({
					movieId : $routeParams.movieId
					}, function(movie){			
						// fonction 'callback' lorsque le résultat (film)
						// est disponible
						$scope.movie = movie;
					});			

		} ]);


/**
 * Filtre la liste des films en ne conservant que les films dont au moins un nom d'acteur correspond
 * au critère de recherche (nom)
 */
function filterByActorName( movies, search ) {
    if(search == ""){
    	return movies;
    }
    console.log('filterByActorName', search, movies);
    var filteredMovies = [];
    var criteria = search.toLowerCase();
    angular.forEach(movies, function(movie) {
    	var actors = movie.actors;
    	angular.forEach(actors, function(actor){
    		if( actor.toLowerCase().search(criteria) > -1) { 
    			// le nom de l'acteur correspond au critère
    			// ==> ajoute le film à la liste de films filtrés
    			if($.inArray(movie, filteredMovies) == -1){
    				filteredMovies.push(movie);
    			}
    		}
	    });
    });
    return filteredMovies;
  };
  
  