(function() {
  var Wish, _ref;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Wish = (function() {
    __extends(Wish, Backbone.Model);
    function Wish() {
      Wish.__super__.constructor.apply(this, arguments);
    }
    return Wish;
  })();
  this.app = (_ref = window.app) != null ? _ref : {};
  this.app.Wish = Wish;
}).call(this);
