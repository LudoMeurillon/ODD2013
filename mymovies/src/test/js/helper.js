'use strict';

beforeEach(function() {
	this.addMatchers({
		toEqualData : function(expected) {
			return angular.equals(this.actual, expected);
		}
	});
});

describe("Test Helper", function(){

	it("should be loaded", function(){
		expect(1).toEqualData(1);
	});
});
