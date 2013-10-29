'use strict';

/* Services */

var mymoviesServices = angular.module('mymoviesServices', ['ngResource']);

mymoviesServices
        .factory('Movie', ['$resource',
          function($resource){
            return $resource('data/movies/:movieId.json', {}, {
              query: {method:'GET', params:{movieId:'movies'}, isArray:true}
            });
          }])
        .factory('movieFromApi', ['$resource',
          function($resource){
            return $resource('rest/movie/:movieId', {}, {});
          }])

        .factory('omdbApi', ['$resource',
          function($resource){
                return $resource('http://www.omdbapi.com/', {}, {
                        get : {method:"JSONP", params:{tomatoes:true, plot:"full", callback: 'JSON_CALLBACK'}}
                });
         }]);
