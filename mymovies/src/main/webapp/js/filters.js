'use strict';



/**
 * From a given array of strings, returns an array with limited size.
 * the end of the array is replaced by a generic '...' string
 */
angular.module('mymoviesFilters', [])
.filter('limitSize', function() {
	return function(input, max) {
		if (typeof (max) == 'undefined') {
			max = 3;
		}

		// TODO : si la taille du tableau 'input' est inférieure ou égale à 'max'
		// renvoyer 'input'
		// sinon, renvoyer un tableau de taille 'max' correspondant au début du tableau input
		// et dont le dernier élément vaut la chaine "..."

		
		return out;

	};
})

/**
 * From a given array of strings, returns a single corresponding the concatenation of values, separated by a commas
 */

.filter('separatedByCommas', function() {
	return function(input) {
		var out = "";
		// TODO : concatener dans 'out' chaque élément du tableau 'input'.
		// separer les éléments par un caractère ',' (virgule)

		return out;
	};
})

; // no more filter

