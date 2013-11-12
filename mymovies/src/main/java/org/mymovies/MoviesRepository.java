package org.mymovies;

import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;

public class MoviesRepository {
	
	static Map<String, Movie> moviesById = new HashMap<String, Movie>();

	public static void loadData(InputStream moviesStream) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		moviesById.clear();
		Movie[] movies = mapper.readValue(moviesStream, Movie[].class);
		for(Movie movie : movies) {
			moviesById.put(movie.getImdb_id(), movie);
		}
		System.out.println("" +moviesById.size()+ " movies loaded");
	}
	
	public static Collection<Movie> getAllMovies() {
		return moviesById.values();
	}
	

	public static Movie getMovie(String movieId) {
		return moviesById.get(movieId);
	}
}
