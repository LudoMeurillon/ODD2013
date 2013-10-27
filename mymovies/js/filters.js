'use strict';



/**
 * From a given array of strings, returns an array with limited size.
 * the end of the array is replaced by a generic '...' string
 */
angular.module('mymoviesFilters', [])
.filter('limitSize', function() {
	return function(input) {
		var max = 3;
		if (input.length <= max) {
			return input;
		}
		var out = input.slice(0, max);
		out[max] = '...';
		return out;

	};
})

/**
 * From a given array of strings, returns a single corresponding the concatenation of values, separated by a commas
 */

.filter('separatedByCommas', function() {
	return function(input) {
		var out = "";
		for ( var i = 0; i < input.length; i++) {
			if (i > 0) {
				out += ", ";
			}
			out += input[i];
		}

		return out;
	};
})

; // no more filter

