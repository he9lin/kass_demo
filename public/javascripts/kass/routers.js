(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  jQuery(function() {
    var KassRouter, _ref;
    KassRouter = (function() {
      __extends(KassRouter, Backbone.Router);
      function KassRouter() {
        KassRouter.__super__.constructor.apply(this, arguments);
      }
      KassRouter.prototype.routes = {
        '': 'browseWishes'
      };
      KassRouter.prototype.initialize = function() {
        app.Wishes.fetch();
        return this.view = new app.AppView({
          collection: app.Wishes
        });
      };
      KassRouter.prototype.browseWishes = function() {};
      return KassRouter;
    })();
    this.app = (_ref = window.app) != null ? _ref : {};
    return this.app.KassRouter = KassRouter;
  });
}).call(this);
