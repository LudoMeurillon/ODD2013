'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

mymoviesControllers
	.controller('MovieListCtrl', [ '$scope', 'Movie',
		function($scope, Movie) {
			// positionne le titre de la page
			$scope.pageTitle = 'My Favorite Movies'
		
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
			
			// TODO : déclarer un tableau 'selectedTags' vide,
			
			//Critère de recherche de films sur la base de nom d'acteurs
			$scope.actor = "";
			//Renvoie vrai si le tag 'category' est selectionné
			$scope.isSelected = function(category){
				// TODO : tester la présence de 'category' parmi les tags sélectionnés
			};
			
			//Selection/Deselectionne un filtre tag
			$scope.toogleSelectedTag = function(category){
				// TODO : si 'category' est selectionnée, l'enlever des tags selectionés
				// sinon, l'ajouter dans les tags sélectionnés
			};
			
			// cette fonction permet de déterminer la/les classes à appliquer
			// à la section des tags
			$scope.tagStyle = function(){
				// TODO : si au moins un tag est sélectionné
				// renvoyer la chaine 'tags-button selected"
				// sinon renvoyer simplement la chaine 'tags-button'
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
	    return function( movies, search ) {
	      if(search == ""){
	      	return movies;
	      }
	      console.log('actorSearch', search, movies);
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

