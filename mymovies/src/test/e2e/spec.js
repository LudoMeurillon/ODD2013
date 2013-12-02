
var MovieListPage = function() {
  this.movies = element.all(by.css(".movie"));
  this.search = element(by.model("actorName"));
  this.tagsLabel = element(by.css(".tags-button"));
  this.firstTag = element(by.repeater("cat in categories | orderBy:'toLowercase()'").row(1));

  this.get = function() {
    browser.get('http://localhost:8080/mymovies/');
  };

  this.searchFor = function(actor){
  	this.search.sendKeys(actor);
  }
};


describe('mymovies homepage', function() {

  it('should filter movie by actor', function() {
  	var listPage = new MovieListPage();

  	listPage.get();

  	var before = listPage.movies.count();
  	expect(before).toBeGreaterThan(0);

  	listPage.searchFor("brad");

  	expect(listPage.movies.count()).toBeLessThan(before);
  });

  it('should filter movie by tags', function() {
    var listPage = new MovieListPage();

    listPage.get();

    var before = listPage.movies.count();

    listPage.tagsLabel.click();
    listPage.firstTag.click();

    expect(listPage.movies.count()).toBeLessThan(before);
  });

});