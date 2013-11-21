'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers
	.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
			// positionne le titre de la page
			$scope.pageTitle = 'My Favorite Movies'
		
			// Films récupérés par le service Movie
			$scope.movies = Movie.query();
			
			
			// Critère de recherche de films sur la base de nom d'acteurs
			
			// TODO : ajouter une propriété 'actor' au scope. Cette propriété est valorisé
			// via le champ de saisie dans la page html. 
		}
	])
	/*
		Filtre permettant de selectionner les films dont un des acteurs
		a un nom qui correspond au critère de recherche (comparaison en miniscule)
	*/
	.filter('actorSearch', function() {
	    return function( movies, search ) {
	      if(search == ""){
	      	return movies;
	      }
	      console.log('actorSearch', search, movies);
	      
	      // liste des films ayant passé le filtre
	      var filteredMovies = [];
	      
	      // TODO : parcourrir les films (on peut utiliser la fonction angular.forEach( <array>, <callback> ) )
	      // pour chaque film, parcourrir les acteurs associés au film
	      // pour chaque acteur du film, tester la correspondance de l'acteur avec la valeur du paramètre 'search'
	      // si correspondance ==> ajouter le film dans la liste des films à renvoyer
	      

	      return filteredMovies;
	    };
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

