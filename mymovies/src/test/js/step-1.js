'use strict';

/* jasmine specs for controllers go here */
describe('My Favorite Movies - Controllers - Step 1', function() {


  beforeEach(module('mymoviesServices'));
  beforeEach(module('mymoviesControllers'));

  describe('MovieListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('rest/movies').respond(
        [{
          "genres":[
            "Biography",
            "Drama",
            "History",
            "War"
          ],
          "title":"Schindler's List",
          "imdb_id":"tt0108052"
        }, 
        {
          "genres":[
            "Action",
            "Crime"
          ],
          "title":"Kill Bill: Vol. 1",
          "imdb_id":"tt0266697"
        }]
      );

      scope =  {};
      // instancie un controlleur 'MovieListCtrl'
      ctrl = $controller('MovieListCtrl', {$scope: scope});
    }));

    it('should be initialized with empty filters', function() {
      expect(scope.filters.length).toBe(0);
    });

    it('should be initialized with empty actor search terms', function() {
      expect(scope.actorsearch).toBe("");
    });

    it('should fetch movies from http resource', function() {
      expect(scope.movies).toEqualData([]);
      $httpBackend.flush();
      expect(scope.movies.length).toBe(2);
    });

//    it('should mege all movies categories', function() {
//      expect(scope.categories).toBeUndefined();
//      $httpBackend.flush();
//      expect(scope.categories.length).toBe(6);
//    });

//    describe("isSelected", function(){
//
//      it('should say that category is not selected if no filters is set', function() {
//        expect(scope.filters.length).toBe(0);
//
//        expect(scope.isSelected("any")).toBe(false);
//      }); 
//
//      it('should say that category is selected', function() {
//        scope.filters.push("selectedCategory")
//
//        expect(scope.isSelected("selectedCategory")).toBe(true);
//        expect(scope.isSelected("otherCategory")).toBe(false);
//      });
//    });   

//    describe("filter", function(){
//
//      it('should add filter if not active', function() {
//        expect(scope.filters.length).toBe(0);
//
//        //When
//        scope.filter("cat");
//
//        //Then
//        expect(scope.filters.length).toBe(1);
//      });
//
//      it('should remove filter if active', function() {
//        scope.filters.push("cat")
//        expect(scope.filters.length).toBe(1);
//
//        //when
//        scope.filter("cat");
//        
//        //then
//        expect(scope.filters.length).toBe(0);
//      });
//
//    });

//    describe("tagStyle", function(){
//      it('should set selected class if any tag is selected', function() {
//        scope.filters.push("cat");
//
//        expect(scope.tagStyle()).toMatch(/selected/);
//      });
//
//      it('should remove selected class if no tag is selected', function() {
//
//        expect(scope.tagStyle()).not.toMatch(/selected/);
//      });
//    });

  });
});

describe('My Favorite Movies - Filters - Step 1', function() {


	// mymoviesFilters d�finit des filtres globaux
	beforeEach(module('mymoviesFilters'));
	
	// mymoviesControllers d�finit le filtre 'actorSearch'
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