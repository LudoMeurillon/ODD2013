package org.mymovies;

import java.io.InputStream;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class DataInitializer implements ServletContextListener {

	public void contextInitialized(ServletContextEvent sce) {
		InputStream allMoviesStream = sce.getServletContext().getResourceAsStream("/data/movies/movies.json");
		try {
			MoviesRepository.loadData(allMoviesStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	public void contextDestroyed(ServletContextEvent sce) {
	}
}
