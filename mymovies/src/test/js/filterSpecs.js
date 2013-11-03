describe('filter', function() {

  beforeEach(module('mymoviesControllers'));

  describe('selectedGenres', function() {

	var data;
  	beforeEach(function(){
	  	data = [
	 	{
	  		id:"id1",
	 		genres : ["action", "thriller"]
	    },
		{
		    id:"id2",
		    genres : ["thriller"]
	    },
		{
		    id:"id3",
		    genres : ["action"]
	    }];
	  });

  	it('should select all items when selectedGenres is empty',
        inject(function(selectedGenresFilter) {
      var selectedGenres = [];

      var result = selectedGenresFilter(data, selectedGenres);
      expect(result.length).toBe(3);
    }));
 
    it('should select items with genre searched',
        inject(function(selectedGenresFilter) {
      var selectedGenres = ["action"];

      var result = selectedGenresFilter(data, selectedGenres);
      expect(result.length).toBe(2);
      expect(result[0].id).toBe("id1");
    }));


    it('should select items with multiple criterias',
        inject(function(selectedGenresFilter) {

      var selectedGenres = ["action", "thriller"];

      var result = selectedGenresFilter(data, selectedGenres);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe("id1");
    }));
  });

	describe('actorSearch', function() {

		var data;
  		beforeEach(function(){
		  	data = [
		 	{
		  		id:"id1",
		 		actors : ["Jean Pierre", "Michel Roger"]
		    },
			{
			    id:"id2",
			    actors : ["Anne Marie-jean"]
		    },
			{
			    id:"id3",
			    actors : ["Bobby Banner"]
		    }];
	  	});



		it('should select all items when search terms are empty',
	        inject(function(actorSearchFilter) {
	      var search = "";

	      var result = actorSearchFilter(data, search);
	      expect(result.length).toBe(3);
	    }));

	    it('should select items with "*jean*"',
	        inject(function(actorSearchFilter) {
	      var search = "jean";

	      var result = actorSearchFilter(data, search);
	      expect(result.length).toBe(2);
	    }));

	     it('should be case insensitive',
	        inject(function(actorSearchFilter) {
	      var search = "anne";

	      var result = actorSearchFilter(data, search);
	      expect(result.length).toBe(2);
	    }));

	});
});