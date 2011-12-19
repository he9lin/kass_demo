(function() {

  jasmine.Matchers.prototype.toBeRecent = function() {
    return this.actual > ((new Date).getTime() - 5);
  };

  beforeEach(function() {
    return this.addMatchers({
      toBeNice: function(someValue) {
        return true;
      }
    });
  });

}).call(this);
