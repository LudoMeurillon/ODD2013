'use strict';

/* Controllers */

var mymoviesControllers = angular.module('mymoviesControllers', []);

var movieListCtrl = mymoviesControllers.controller('MovieListCtrl', [ '$scope', 'Movie',
	function($scope, Movie) {
		
		/* 
			TODO : Scope 
		    
			Ajouter un attribut du scope 'pageTitle' 
			ayant pour valeur 'My Favorite Movies'
		*/
	

		//Films récupérés par le service Movie
		$scope.movies = Movie.query();

		//Critère de recherche de films sur la base de nom d'acteurs
		$scope.actorName = "";


		$scope.categories = ["Adventure", "Animation", "Comedy", "Crime", "Drama", "Family", "History","Thriller", "Western"];

		//Filtres d'affichage des films (tags)
		$scope.selectedCategories = [];

		
		//Renvoie vrai si le tag 'category' est selectionné
		$scope.isSelected = function(category){
			return ($.inArray(category, $scope.selectedCategories) > -1);
		};

		//Selection/Deselectionne un filtre tag
		$scope.toggleCategory = function(category){
			if($scope.isSelected(category)){
				var index = $scope.selectedCategories.indexOf(category);
				$scope.selectedCategories.splice(index,1);
			}else{
				$scope.selectedCategories.push(category);
			}
		};

		$scope.tagStyle = function(){
			if($scope.selectedCategories.length > 0){
				return "tags-button selected"
			}
			return "tags-button"
		}
	}
]);

/*
	Filtre permettant de selectionner les films qui 
	correspondent aux tags selectionnés.
*/
movieListCtrl.filter('filterByTags', function() {
	/*
		TODO : Tags

		Remplace la fonction suivante par l'une des fonctions au bas de la page pour 
		filter les films par liste de tags
	*/
	return function( movies, categories ) {
		return movies;
    };
});

/*
	Filtre permettant de selectionner les films dont un des acteurs
	a un nom qui correspond au critère de recherche (comparaison en miniscule)
*/
movieListCtrl.filter('actorSearch', function() {
	/*
		TODO : Filter

		Remplace la fonction suivante par l'une des fonctions au bas de la page pour 
		filter les films par nom d'acteur
	*/
    return function( movies, search ) {
    	return items;
    };
});




mymoviesControllers.controller('MovieDetailCtrl', [ '$scope', '$routeParams','Movie',
    function($scope, $routeParams, Movie) {
        $scope.pageTitle = 'My Movie Details';
        $scope.id = $routeParams.movieId;
        
        // envoie une requete GET vers le serveur en passant
        // l'identifiant de film a obtenir
        Movie.get(
        	{
            	movieId : $routeParams.movieId
        	}, 
        	function(movie){                        
            	// fonction 'callback' lorsque le résultat (film)
            	// est disponible
            	$scope.movie = movie;
        	}
        );                        
	}
]);



/*
	Filtre la liste des films en ne conservant que les films dont au moins un nom d'acteur correspond
	au critère de recherche (nom)
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


/*
	Filtre la liste des films en ne conservant que les films 
 	qui correspondent à toutes les categories passées en parametre
 */
function filterMoviesByCategories( movies, categories ){
	var filtered = [];
	//Pas de filtre selectionné, on affiche tout
	if(categories.length == 0){
		return movies;
	}
	angular.forEach(movies, function(movie) {
		//On copie les filtres selectionnés pour les eliminer 
		//à chaque correspondance pour le film testé
		var searchedGenres = [];
		angular.forEach(categories, function(filter){
			searchedGenres[filter]=false;
		});

		var currentGenres = movie.genres;
		if(currentGenres){
	  	angular.forEach(categories, function(filter){
	  		if(currentGenres.indexOf(filter) > -1){
	  			delete searchedGenres[filter];
	  		}
	  	});
	}
	if(Object.keys(searchedGenres).length == 0){
		filtered.push(movie);
	}
	});
	return filtered;
};





