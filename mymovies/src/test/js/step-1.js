'use strict';

describe('My Favorite Movies - Step 1', function() {
	
  var mockMymoviesServices;

	// charge le module 'mymoviesControllers'
  beforeEach(module('mymoviesControllers'));
  
  beforeEach(function(){
	  mockMymoviesServices = {
	            query: function() {
	            	return [];
	            }
	       };
  });

  
  describe('MovieListCtrl', function(){
    var scope, ctrl;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {     
      scope =  {};
      // instancie un controlleur 'MovieListCtrl' avec un scope vide
      ctrl = $controller('MovieListCtrl', {$scope: scope, 'Movie' : mockMymoviesServices});
    }));

    
    it('should be initialized with page title', function() {
      expect(scope.pageTitle).toBe("My Favorite Movies");
    });

  });
  
  
});