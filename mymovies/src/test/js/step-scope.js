'use strict';



describe('My Favorite Movies - Etape Scope', function() {

  beforeEach(module('mymoviesServices'));
  beforeEach(module('mymoviesControllers'));

  describe('MovieListCtrl creation', function(){
    var scope, ctrl;

    // Simule le service de recuperation de film avec un comportement vide
    var mockMymoviesServices = {
        query: function() {
        	return [];
        }
   	};

    beforeEach(inject(function($controller) {     
      scope =  {};
      // instancie un controlleur 'MovieListCtrl' avec un scope vide
      ctrl = $controller('MovieListCtrl', {$scope: scope, 'Movie' : mockMymoviesServices});
    }));

    
    it('should be initialized with page title', function() {
      	expect(scope.pageTitle).toBe("My Favorite Movies");
    });

  });


  describe('MovieListCtrl movies querying', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $controller) {
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


    it('should be initialized with empty actor search terms', function() {
      expect(scope.actorName).toBe("");
    });

    it('should fetch movies from http resource', function() {
      expect(scope.movies).toEqualData([]);
      $httpBackend.flush();
      expect(scope.movies.length).toBe(2);
    });
  });
});


