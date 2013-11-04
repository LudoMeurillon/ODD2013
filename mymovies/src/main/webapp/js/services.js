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
	.factory('themoviedbApi', ['$http', 
		function($http){
		    var themoviedbApi = {
		    	config : function(){
		    		return $http.get('http://api.themoviedb.org/3/configuration', 
		    			{ params: 
		    				{ 
		    					api_key:"364d461c7e9fdcbc8644a38adf929a72"
		    				}
		    			});
		    	},
		    	search : function(title){
		    		console.log("Looking for "+title+ " on moviedbapi")
		    		return $http.get('http://api.themoviedb.org/3/search/movie', 
		    			{ params: 
		    				{ 
		    					api_key:"364d461c7e9fdcbc8644a38adf929a72",
		    				  	query : title
		    				}
		    			});
		    	},
		    	images : function(id){
		    		console.log("Looking for images of "+id+ " on moviedbapi")
		    		return $http.get('http://api.themoviedb.org/3/movie/'+id+"/images", 
		    			{ params: 
		    				{ 
		    					api_key:"364d461c7e9fdcbc8644a38adf929a72"
		    				}
		    			});
		    	}
		    }
		    return themoviedbApi;
	  	}
	])
	.factory('omdbApi', ['$resource',
	  function($resource){
		return $resource('http://www.omdbapi.com/', {}, {
			get : {method:"JSONP", params:{tomatoes:true, plot:"full", callback: 'JSON_CALLBACK'}}
		});
	 }]);
