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
}).filter('limitSize', function() {
    return function(array, max) {
        if (typeof (max) == 'undefined') {
                max = 3;
        }
        if (!array) {
                return array;
        }
        if (array.length <= max) {
                return array;
        }
        var out = array.slice(0, max);
        out[max] = '...';
        return out;
	}
})




; // no more filter

