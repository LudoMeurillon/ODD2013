package org.mymovies;

public class Movie {
	private String title;
	private String plot;
	private String plot_simple;
	private long rating;
	private String[] genres;
	private String release_date;
	private String year;
	private String[] directors;
	private String[] runtime;
	private String[] actors;
	private String imdb_id;
	private String tomatoMeter, tomatoRating, tomatoUserMeter, tomatoUserRating, tomatoConsensus;
	private String webSite;


	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPlot() {
		return plot;
	}
	public void setPlot(String plot) {
		this.plot = plot;
	}
	public long getRating() {
		return rating;
	}
	public void setRating(long rating) {
		this.rating = rating;
	}
	public String[] getGenres() {
		return genres;
	}
	public void setGenres(String[] genres) {
		this.genres = genres;
	}
	public String getRelease_date() {
		return release_date;
	}
	public void setRelease_date(String release_date) {
		this.release_date = release_date;
	}
	public String[] getDirectors() {
		return directors;
	}
	public void setDirectors(String[] directors) {
		this.directors = directors;
	}
	public String[] getRuntime() {
		return runtime;
	}
	public void setRuntime(String[] runtime) {
		this.runtime = runtime;
	}
	public String[] getActors() {
		return actors;
	}
	public void setActors(String[] actors) {
		this.actors = actors;
	}
	public String getImdb_id() {
		return imdb_id;
	}
	public void setImdb_id(String imdb_id) {
		this.imdb_id = imdb_id;
	}
	public String getTomatoMeter() {
		return tomatoMeter;
	}
	public void setTomatoMeter(String tomatoMeter) {
		this.tomatoMeter = tomatoMeter;
	}
	public String getTomatoRating() {
		return tomatoRating;
	}
	public void setTomatoRating(String tomatoRating) {
		this.tomatoRating = tomatoRating;
	}
	public String getTomatoUserMeter() {
		return tomatoUserMeter;
	}
	public void setTomatoUserMeter(String tomatoUserMeter) {
		this.tomatoUserMeter = tomatoUserMeter;
	}
	public String getTomatoUserRating() {
		return tomatoUserRating;
	}
	public void setTomatoUserRating(String tomatoUserRating) {
		this.tomatoUserRating = tomatoUserRating;
	}
	public String getWebSite() {
		return webSite;
	}
	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}
	public String getTomatoConsensus() {
		return tomatoConsensus;
	}
	public void setTomatoConsensus(String tomatoConsensus) {
		this.tomatoConsensus = tomatoConsensus;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getPlot_simple() {
		return plot_simple;
	}
	public void setPlot_simple(String plot_simple) {
		this.plot_simple = plot_simple;
	}
	
	
	
}
