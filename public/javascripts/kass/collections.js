(function() {
  var Wishes, _ref;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Wishes = (function() {
    __extends(Wishes, Backbone.Collection);
    function Wishes() {
      Wishes.__super__.constructor.apply(this, arguments);
    }
    Wishes.prototype.model = app.Wish;
    Wishes.prototype.url = '/api/wishes';
    return Wishes;
  })();
  this.app = (_ref = window.app) != null ? _ref : {};
  this.app.Wishes = new Wishes;
}).call(this);
