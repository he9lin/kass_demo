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
    Wish.prototype.defaults = function() {
      return {
        'lat': 121.491 + Math.floor(Math.random() * 1000) / 1000,
        'lng': 31.233 + Math.floor(Math.random() * 1000) / 1000
      };
    };
    Wish.prototype.price = function() {
      return '$' + this.get('price');
    };
    Wish.prototype.validate = function(attributes) {
      var mergedAttributes;
      mergedAttributes = _.extend(_.clone(this.attributes), attributes);
      if (!mergedAttributes.title || mergedAttributes.title.trim() === '') {
        return "Wish title must not be blank.";
      }
      if (!mergedAttributes.expired_at || mergedAttributes.expired_at.trim() === '') {
        return "Wish expiration time must not be blank.";
      }
      if (!mergedAttributes.price || mergedAttributes.price.trim() === '') {
        return "Wish price must not be blank.";
      }
      if (!(mergedAttributes.price.match(/^\d+$/) || mergedAttributes.price.match(/\d*\.\d{1,2}$/))) {
        return "Wish price must be in format: 11 or 1.1 or 1.11";
      }
    };
    return Wish;
  })();
  this.app = (_ref = window.app) != null ? _ref : {};
  this.app.Wish = Wish;
}).call(this);
