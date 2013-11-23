'use strict';

/* Directives */

angular.module('mymoviesDirectives', [])

/*
Directive permettant d'afficher une note avec des étoiles

Exemple : pour afficher une note de 5.2/10 avec 20 étoiles

	<vote value='5.2' max='10' stars='20'/>
*/

.directive('vote', function(){
	return {
    	restrict: 'E',
    	scope:{
    		// TODO - 3 : définir les 3 attributs de la directive : value, max et stars
    		// respectivement associés aux variables vote, max et starts

    	},
    	link : function(scope, element, attrs){
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

    		scope.label = attrs["label"]

    	},
    	// TODO - 3 : définir la proprieté 'template' avec la valeur correspondant à une chaine de template html
    };
});