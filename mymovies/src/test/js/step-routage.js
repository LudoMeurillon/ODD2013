'use strict';

describe('My Favorite Movies - Etape Routage', function() {
	beforeEach(module('mymoviesApp'));

	it('should redirect root requests to movie list', function() {

		inject(function($route) {
	    	expect($route.routes[null].redirectTo).toEqual('/movies')
	  	});
	});

	it('should map /movies to MovieListCtrl', function() {

		inject(function($route) {
	    	expect($route.routes["/movies"].controller).toEqual('MovieListCtrl')
	  	});
	});

	it('should map /movies to movie-list.html', function() {

		inject(function($route) {
	    	expect($route.routes["/movies"].templateUrl).toEqual('views/movie-list.html')
	  	});
	});

	it('should map /movies/:movieid to movie-list.html and MovieListCtrl', function() {

		inject(function($route) {
	    	expect($route.routes["/movies/:movieId"].controller).toEqual('MovieDetailCtrl')
	    	expect($route.routes["/movies/:movieId"].templateUrl).toEqual('views/movie-detail.html')
	  	});
	});
})
