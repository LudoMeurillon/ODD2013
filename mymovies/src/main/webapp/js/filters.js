'use strict';


angular.module('mymoviesFilters', [])
.filter('separatedByCommas', function() {
	return function(input) {
		var out = "";
		if (!input) {
			return input;
		}
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

