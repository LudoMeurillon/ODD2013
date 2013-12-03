'use strict';

/* Directives */

var myMoviesDirectives = angular.module('mymoviesDirectives', [])

/*
Directive permettant d'afficher une note avec des étoiles

Exemple : pour afficher une note de 5.2/10 avec 20 étoiles

	<vote value='5.2' max='10' stars='20'/>
*/

myMoviesDirectives.directive('vote', function(){
	return {
        //La directive n'est disponible que par element <vote> 
    	restrict: 'E',
        //Binding des attributs avec le scope de la directive
    	scope:{
    		vote:"=value",
    		max:"=max",
    		stars:"=stars"
    	},
    	link : function(scope, element, attrs){
    		//Genere un tableau de 1 à max [1,2,3 .... max]
    		scope.range = function(max){
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

    		scope.label = attrs["label"];

    	},
        /*
            TODO : Directive
            
            Utilisez un template correct à la place du code ci dessous qui ne fait rien
            Vous pouvez utiliser la variable correctTemplate disponible au bas de ce fichier
        */
    	template:"TODO: &lt;vote/&gt;"
    };
});

var correctTemplate = "<ul><span>{{label}}</span><li ng-repeat=\"i in range(stars)\"><i ng-class=\"getStarClass(i)\"/></li></ul>";
