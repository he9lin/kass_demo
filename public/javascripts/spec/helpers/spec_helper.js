(function() {
  beforeEach(function() {
    return this.addMatchers({
      toBeNice: function(someValue) {
        return true;
      }
    });
  });
}).call(this);
