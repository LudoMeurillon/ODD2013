'use strict';

/* Services */

var mymoviesServices = angular.module('mymoviesServices', ['ngResource']);

mymoviesServices.factory('Movie', ['$resource',
  function($resource){
    return $resource('data/movies/:movieId.json', {}, {
      query: {method:'GET', params:{movieId:'movies'}, isArray:true}
    });
  }]);
