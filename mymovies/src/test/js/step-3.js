'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  beforeEach(module('mymoviesDirectives'));

  describe('vote', function() {
    it('should print label before stars', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<vote label="test prefix" value="2.5" max="5" stars="10"></vote>')($rootScope);
        $rootScope.$digest();
        expect(element.find("ul").text()).toBe("test prefix");
      });
    });

    it('should print x stars', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<vote prefix="test" value="2.5" max="5" stars="10"></vote>')($rootScope);
        $rootScope.$digest();
        expect(element.find("ul li").length).toBe(10);
      });
    });

    it('should print fill full stars regarding to value/max ratio', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<vote prefix="test" value="2.5" max="5" stars="10"></vote>')($rootScope);
        $rootScope.$digest();
        expect(element.find("ul li .glyphicon-star").length).toBe(5);
      });
    });

    it('should print fill empty stars regarding to value/max ratio', function() {
      inject(function($compile, $rootScope) {
        var element = $compile('<vote prefix="test" value="2.5" max="5" stars="10"></vote>')($rootScope);
        $rootScope.$digest();
        expect(element.find("ul li .glyphicon-star-empty").length).toBe(5);
      });
    });
  });
});