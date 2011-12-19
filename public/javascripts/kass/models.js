(function() {
  var Wish, _ref,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Wish = (function(_super) {

    __extends(Wish, _super);

    function Wish() {
      Wish.__super__.constructor.apply(this, arguments);
    }

    Wish.prototype.defaults = {
      'lat': 121.491 + Math.floor(Math.random() * 1000) / 1000,
      'lng': 31.233 + Math.floor(Math.random() * 1000) / 1000
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
    };

    return Wish;

  })(Backbone.Model);

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.Wish = Wish;

}).call(this);
