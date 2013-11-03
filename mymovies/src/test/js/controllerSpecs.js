'use strict';

/* jasmine specs for controllers go here */
describe('Movies controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('mymoviesServices'));
  beforeEach(module('mymoviesControllers'));

  describe('MovieListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/movies/movies.json').respond(
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

    it('should mege all movies categories', function() {
      expect(scope.categories).toBeUndefined();
      $httpBackend.flush();
      expect(scope.categories.length).toBe(6);
    });

    describe("isSelected", function(){

      it('should say that category is not selected if no filters is set', function() {
        expect(scope.filters.length).toBe(0);

        expect(scope.isSelected("any")).toBe(false);
      }); 

      it('should say that category is selected', function() {
        scope.filters.push("selectedCategory")

        expect(scope.isSelected("selectedCategory")).toBe(true);
        expect(scope.isSelected("otherCategory")).toBe(false);
      });
    });   

    describe("filter", function(){

      it('should add filter if not active', function() {
        expect(scope.filters.length).toBe(0);

        //When
        scope.filter("cat");

        //Then
        expect(scope.filters.length).toBe(1);
      });

      it('should remove filter if active', function() {
        scope.filters.push("cat")
        expect(scope.filters.length).toBe(1);

        //when
        scope.filter("cat");
        
        //then
        expect(scope.filters.length).toBe(0);
      });

    });

    describe("tagStyle", function(){
      it('should set selected class if any tag is selected', function() {
        scope.filters.push("cat");

        expect(scope.tagStyle()).toMatch(/selected/);
      });

      it('should remove selected class if no tag is selected', function() {

        expect(scope.tagStyle()).not.toMatch(/selected/);
      });
    });

  });
});