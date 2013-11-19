'use strict';

/* jasmine specs for controllers go here */
describe('My Favorite Movies - Step 4', function() {


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


    it('should be initialized with no selected tags', function() {
      expect(scope.selectedTags.length).toBe(0);
    });

    it('should mege all movies categories', function() {
      expect(scope.categories).toBeUndefined();
      $httpBackend.flush();
      expect(scope.categories.length).toBe(6);
    });

    describe("isSelected", function(){

      it('should say that category is not selected if no filters is set', function() {
        expect(scope.selectedTags.length).toBe(0);

        expect(scope.isSelected("any")).toBe(false);
      }); 

      it('should say that category is selected', function() {
        scope.selectedTags.push("selectedCategory")

        expect(scope.isSelected("selectedCategory")).toBe(true);
        expect(scope.isSelected("otherCategory")).toBe(false);
      });
    });   

    describe("toogleSelectedTag", function(){

      it('should add tag to selected tags if not already active', function() {
        expect(scope.selectedTags.length).toBe(0);

        //When
        scope.toogleSelectedTag("cat");

        //Then
        expect(scope.selectedTags.length).toBe(1);
      });

      it('should remove tag from selected tags if already active', function() {
        scope.selectedTags.push("cat")
        expect(scope.selectedTags.length).toBe(1);

        //when
        scope.toogleSelectedTag("cat");
        
        //then
        expect(scope.selectedTags.length).toBe(0);
      });

    });

    describe("tagStyle", function(){
      it('should set selected class if any tag is selected', function() {
        scope.selectedTags.push("cat");

        expect(scope.tagStyle()).toMatch(/selected/);
      });

      it('should remove selected class if no tag is selected', function() {

        expect(scope.tagStyle()).not.toMatch(/selected/);
      });
    });

  });
});