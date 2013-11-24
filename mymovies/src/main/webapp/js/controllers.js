'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers
	.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
		
			// TODO - 1 : ajouter un attribut du scope 'pageTitle' valorisé à
			// la valeur 'My Favorite Movies'
		
			//Films récupérés par le service Movie
			$scope.movies = Movie.query();						
		}
	])

	
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

