(function() {
  var _ref;

  this.app = (_ref = window.app) != null ? _ref : {};

  jQuery(function() {
    this.app.router = new app.KassRouter;
    return Backbone.history.start({
      pushState: true
    });
  });

}).call(this);
