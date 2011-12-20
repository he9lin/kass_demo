(function() {
  jasmine.Matchers.prototype.toBeRecent = function() {
    return this.actual > ((new Date).getTime() - 5);
  };
  jasmine.Matchers.prototype.toBeCloseBy = function() {
    return (this.actual.lat > 120 || this.actual.lat < 122) && (this.actual.lng > 30 || this.actual.lng < 32);
  };
  beforeEach(function() {
    return this.addMatchers({
      toBeNice: function(someValue) {
        return true;
      }
    });
  });
}).call(this);
