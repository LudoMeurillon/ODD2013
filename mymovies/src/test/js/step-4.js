'use strict';

/* jasmine specs for controllers go here */
describe('My Favorite Movies - Etape 4 - Filter movies by tags', function() {

  beforeEach(module('mymoviesServices'));
  beforeEach(module('mymoviesControllers'));

  describe('MovieListCtrl', function(){
    var scope, ctrl, parse, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $parse) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('rest/movies').respond(
        [{
          "title":"Schindler's List",
          "imdb_id":"tt0108052",
          "genres":[
            "Biography",
            "Drama",
            "History",
            "War"
          ],
        }, 
        {
          "title":"Kill Bill: Vol. 1",
          "imdb_id":"tt0266697",
          "genres":[
            "Action",
            "Crime"
          ],
        }]
      );

      scope =  {};
      parse = $parse;
      // instancie un controlleur 'MovieListCtrl'
      ctrl = $controller('MovieListCtrl', {$scope: scope});
    }));


    it('should be initialized with no selected tags', function() {
      expect(scope.selectedCategories.length).toBe(0);
    });

/*
    it('should mege all movies categories', function() {
      expect(scope.categories).toBeUndefined();
      $httpBackend.flush();
      expect(scope.categories.length).toBe(6);
    });
*/

    describe("isSelected", function(){

      it('should say that category is not selected if no filters is set', function() {
        expect(scope.selectedCategories.length).toBe(0);

        expect(scope.isSelected("any")).toBe(false);
      }); 

      it('should say that category is selected', function() {
        scope.selectedCategories.push("selectedCategory")

        expect(scope.isSelected("selectedCategory")).toBe(true);
        expect(scope.isSelected("otherCategory")).toBe(false);
      });
    });   

    describe("toogleSelectedTag", function(){

      it('should add tag to selected tags if not already active', function() {
        expect(scope.selectedCategories.length).toBe(0);

        //When
        scope.toggleCategory("cat");

        //Then
        expect(scope.selectedCategories.length).toBe(1);
      });

      it('should remove tag from selected tags if already active', function() {
        scope.selectedCategories.push("cat")
        expect(scope.selectedCategories.length).toBe(1);

        //when
        scope.toggleCategory("cat");
        
        //then
        expect(scope.selectedCategories.length).toBe(0);
      });

    });

    describe("tagStyle", function(){
      it('should set selected class if any tag is selected', function() {
        scope.selectedCategories.push("cat");

        expect(scope.tagStyle()).toMatch(/selected/);
      });

      it('should remove selected class if no tag is selected', function() {

        expect(scope.tagStyle()).not.toMatch(/selected/);
      });
    });

    describe("filterByTags filter ", function(){

      beforeEach(function(){
        $httpBackend.flush();

        expect(scope.movies.length).toBe(2);
        expect(scope.selectedCategories.length).toBe(0);
      });

      it('should show all movies if no category is selected', function(){
        var movies = parse("movies | filterByTags:selectedCategories")(scope);
        expect(movies.length).toBe(scope.movies.length);
      });
      it('should return mathing Drama movies if only Drama is selected', function(){
        scope.toggleCategory("Drama");

        var movies = parse("movies | filterByTags:selectedCategories")(scope);
        expect(movies.length).toBe(1);
      });

      it('should return no movie if too much categories are selected', function(){
        scope.toggleCategory("Drama");
        scope.toggleCategory("Crime");


        var movies = parse("movies | filterByTags:selectedCategories")(scope);
        expect(movies.length).toBe(0);
      });
    });

  });
});