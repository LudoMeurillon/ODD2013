package org.mymovies;

import java.util.Collection;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/movies")
public class MovieResource {
	
	/**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Movie movie(@PathParam("id") String id) {
        return MoviesRepository.getMovie(id);
    }
    
    @GET
    @Path("/")
	@Produces(MediaType.APPLICATION_JSON)
    public Collection<Movie> movies() {
    	return MoviesRepository.getAllMovies();
    }    
    
}
