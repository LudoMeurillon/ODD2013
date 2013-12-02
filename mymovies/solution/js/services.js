'use strict';

/* Services */

var mymoviesServices = angular.module('mymoviesServices', ['ngResource']);

mymoviesServices
	.factory('Movie', ['$resource',
	  function($resource){
	    return $resource('rest/movies/:movieId', {}, {});
	  }])
