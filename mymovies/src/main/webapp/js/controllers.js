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

				// TODO - 4 : construire un objet 'categories' dont les champs correspondent
				// à l'ensemble des catégories des films récupérées
			});
			
			// cette liste contient les tags sélectionnés par l'utilisateur
			$scope.selectedTags = [];
			
			//Critère de recherche de films sur la base de nom d'acteurs
			$scope.actor = "";
			//Renvoie vrai si le tag 'category' est selectionné
			$scope.isSelected = function(category){
				return ($.inArray(category, $scope.selectedTags) > -1);
			};
			
			//Selection/Deselectionne un filtre tag
			$scope.toogleSelectedTag = function(category){
				if($scope.isSelected(category)){
					var index = $scope.selectedTags.indexOf(category);
					$scope.selectedTags.splice(index,1);
				}else{
					$scope.selectedTags.push(category);
				}
			};
			
			// cette fonction permet de déterminer la/les classes à appliquer
			// à la section des tags
			$scope.tagStyle = function(){
				if($scope.selectedTags.length > 0){
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
	
	// TODO - 4 : déclarer un filtre 'selectedGenres' utilisant la fonction 'filterByTags'
	// déclarée ci-dessous
	
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
  
  /**
   * Filtre la liste de films en ne conservant que ceux qui correspondent à l'ensemble
   * des tags données
   * @param movies
   * @param tags
   * @returns
   */
  function filterByTags( movies, tags ) {
      var filtered = [];
      //Pas de filtre selectionné, on affiche tout
      if(tags.length == 0){
      	return movies;
      }
      angular.forEach(movies, function(movie) {
      	//On copie les filtres selectionnés pour les eliminer 
      	//à chaque correspondance pour le film testé
      	var searchedGenres = [];
      	angular.forEach(tags, function(tag){
      		searchedGenres[tag]=false;
      	});

      	var currentGenres = movie.genres;
      	if(currentGenres){
	      	angular.forEach(tags, function(tag){
	      		if(currentGenres.indexOf(tag) > -1){
	      			delete searchedGenres[tag];
	      		}
	      	});
	    }
	    if(Object.keys(searchedGenres).length == 0){
	    	filtered.push(movie);
		}
      });
      return filtered;
    };