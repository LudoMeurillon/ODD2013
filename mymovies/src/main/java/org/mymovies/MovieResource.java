package org.mymovies;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;

@Path("/movie")
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
    	try {
    		ObjectMapper mapper = new ObjectMapper();
    		mapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    		return mapper.readValue(doHttpUrlConnectionAction("http://mymovieapi.com/?id="+id+"&plot=full"), Movie.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return null;
    }
    
    /**
     * Returns the output from the given URL.
     * 
     * I tried to hide some of the ugliness of the exception-handling
     * in this method, and just return a high level Exception from here.
     * Modify this behavior as desired.
     * 
     * @param desiredUrl
     * @return
     * @throws Exception
     */
    private String doHttpUrlConnectionAction(String desiredUrl)
    throws Exception
    {
      URL url = null;
      BufferedReader reader = null;
      StringBuilder stringBuilder;

      try
      {
        // create the HttpURLConnection
        url = new URL(desiredUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        
        // just want to do an HTTP GET here
        connection.setRequestMethod("GET");
        
        // uncomment this if you want to write output to this url
        //connection.setDoOutput(true);
        
        // give it 15 seconds to respond
        connection.setReadTimeout(15*1000);
        connection.connect();

        // read the output from the server
        reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        stringBuilder = new StringBuilder();

        String line = null;
        while ((line = reader.readLine()) != null)
        {
          stringBuilder.append(line + "\n");
        }
        return stringBuilder.toString();
      }
      catch (Exception e)
      {
        e.printStackTrace();
        throw e;
      }
      finally
      {
        // close the reader; this can throw an exception too, so
        // wrap it in another try/catch block.
        if (reader != null)
        {
          try
          {
            reader.close();
          }
          catch (IOException ioe)
          {
            ioe.printStackTrace();
          }
        }
      }
    }
}
