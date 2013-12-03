'use strict';

describe('My Favorite Movies - Etape Filters', function() {

	// mymoviesFilters définit des filtres globaux
	beforeEach(module('mymoviesFilters'));
	
	// mymoviesControllers définit le filtre 'actorSearch'
	beforeEach(module('mymoviesControllers'));

	// tests sur le filtre 'actorSearch'
	describe('actorSearch', function() {

		var data;
		beforeEach(function() {
			data = [ {
				id : "id1",
				actors : [ "Jean Pierre", "Michel Roger" ]
			}, {
				id : "id2",
				actors : [ "Anne Marie-jean" ]
			}, {
				id : "id3",
				actors : [ "Bobby Banner" ]
			} ];
		});

		it('should select all items when search terms are empty',
				inject(function(actorSearchFilter) {
					var search = "";

					var result = actorSearchFilter(data, search);
					expect(result.length).toBe(3);
				}));

		it('should select items with "*jean*"', inject(function(
				actorSearchFilter) {
			var search = "jean";

			var result = actorSearchFilter(data, search);
			expect(result.length).toBe(2);
		}));

		it('should be case insensitive', inject(function(actorSearchFilter) {
			var search = "anne";

			var result = actorSearchFilter(data, search);
			expect(result.length).toBe(2);
		}));

	});
	

	// tests sur le filtre 'limitSize' 
	describe('limitSize', function() {

		it('should shorten the array with an elipsis string if the array size exceed max value',
				inject(function(limitSizeFilter) {
					var data = ["one", "two", "three"];

					var result = limitSizeFilter(data, 2);
					expect(result.length).toBe(3);
					expect(result[2]).toBe("...");
				}));

		it('should return the same value if the array size is below max value',
				inject(function(limitSizeFilter) {
			var data = ["one", "two", "three"];

			var result = limitSizeFilter(data, 4);
			expect(result).toEqualData(data);
		}));

	});	
	


	// tests sur le filtre 'separatedByCommas' 
	describe('separatedByCommas', function() {

		it('should transform an array of strings into a single separated by commas string',
				inject(function(separatedByCommasFilter) {
					var data = ["one", "two", "three"];

					var result = separatedByCommasFilter(data);
					expect(result).toBe('one, two, three');
				}));

		it('should transform single item array of strings into a string with no comma',
				inject(function(separatedByCommasFilter) {
					var data = ["one"];

					var result = separatedByCommasFilter(data);
					expect(result).toBe('one');
				}));
		
		it('should transform an empty array of strings into an empty string',
				inject(function(separatedByCommasFilter) {
					var data = [];

					var result = separatedByCommasFilter(data);
					expect(result).toBe('');
				}));		

	});		
});


