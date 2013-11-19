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
			//Filtres d'affichage des films (tags)*
			
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



mymoviesControllers.controller('MovieDetailCtrl', [ '$scope', '$routeParams','omdbApi', 'themoviedbApi',
	function($scope, $routeParams, omdbApi, themoviedbApi) {

			$scope.pageTitle = 'My Movie Details';
			$scope.id = $routeParams.movieId;
			$scope.photos = [];
			omdbApi.get(
					{
						i : $routeParams.movieId
					}, 
					function(movie) {
						$scope.setMovie(movie);
					});

			$scope.setMovie = function(movie){
				$scope.movie = movie;
				$scope.moviedb_config();
			};

			$scope.moviedb_config = function(){
				themoviedbApi.config().then(
					function(result){
						$scope.config = result.data;
						$scope.moviedb_search();
					}
				);
			}
			

			$scope.moviedb_search = function(){
				themoviedbApi.search($scope.movie.Title).then(
					function(result){
						$scope.moviedb_movieid = result.data.results[0].id;
						$scope.moviedb_images()
					}
				);
			}

			$scope.moviedb_images = function(){
				themoviedbApi.images($scope.moviedb_movieid).then(
					function(result){
						console.log(result.data);
						$scope.posterSource = $scope.config.images.base_url+"original"+result.data.posters[0].file_path;
						
						angular.forEach(result.data.backdrops, function(poster){
							$scope.photos.push($scope.config.images.base_url+"w185"+poster.file_path);
						})
					}
				);
			}
		} ]);

