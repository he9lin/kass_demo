(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  jQuery(function() {
    var AppView, DetailWishView, NewWishView, WishView, WishesListView, WishesMapView, _ref;
    AppView = (function() {
      __extends(AppView, Backbone.View);
      function AppView() {
        AppView.__super__.constructor.apply(this, arguments);
      }
      AppView.prototype.el = '#main';
      AppView.prototype.initialize = function(options) {
        return this.subviews = [
          new WishesMapView({
            collection: this.collection
          }), new WishesListView({
            collection: this.collection
          })
        ];
      };
      AppView.prototype.render = function() {
        var subview, _i, _len, _ref;
        $(this.el).empty();
        _ref = this.subviews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subview = _ref[_i];
          $(this.el).append(subview.render().el);
        }
        this.renderMap();
        return this;
      };
      AppView.prototype.renderMap = function() {
        return window.loadScript();
      };
      return AppView;
    })();
    NewWishView = (function() {
      __extends(NewWishView, Backbone.View);
      function NewWishView() {
        this.flashWarning = __bind(this.flashWarning, this);
        NewWishView.__super__.constructor.apply(this, arguments);
      }
      NewWishView.prototype.template = _.template($('#new-wish-template').html());
      NewWishView.prototype.id = 'new-wish';
      NewWishView.prototype.events = {
        'click input#post-wish': 'save',
        'focus input#new-wish-expired-at': 'showTimeChooser',
        'blur input#new-wish-expired-at': 'hideTimeChooser',
        'click ul.time-chooser li': 'chooseTime'
      };
      NewWishView.prototype.showTimeChooser = function() {
        return this.$('ul.time-chooser').show();
      };
      NewWishView.prototype.hideTimeChooser = function() {
        return setTimeout(function() {
          return this.$('ul.time-chooser').hide();
        }, 200);
      };
      NewWishView.prototype.chooseTime = function(event) {
        var target;
        target = $(event.target);
        if (!target.hasClass('time')) {
          target = $(event.target).parent();
        }
        return this.$('input#new-wish-expired-at').val(target.text());
      };
      NewWishView.prototype.render = function() {
        $(this.el).html(this.template());
        return this;
      };
      NewWishView.prototype.save = function(event) {
        var errorCallback, newAttributes;
        event.preventDefault();
        newAttributes = {
          title: this.$('input#new-wish-title').val(),
          content: this.$('input#new-wish-content').val(),
          price: this.$('input#new-wish-price').val(),
          expired_at: this.$('input#new-wish-expired-at').val()
        };
        errorCallback = {
          error: this.flashWarning
        };
        if (this.collection.create(newAttributes, errorCallback)) {
          return $(document).trigger('close.facebox');
        }
      };
      NewWishView.prototype.flashWarning = function(model, error) {
        return console.log(error);
      };
      return NewWishView;
    })();
    WishesMapView = (function() {
      __extends(WishesMapView, Backbone.View);
      function WishesMapView() {
        WishesMapView.__super__.constructor.apply(this, arguments);
      }
      WishesMapView.prototype.template = _.template($('#wishes-map-template').html());
      WishesMapView.prototype.id = 'wishes-map';
      WishesMapView.prototype.events = {
        'click a#launch-wish': 'showNewWishForm'
      };
      WishesMapView.prototype.render = function() {
        $(this.el).html(this.template());
        this.resetDimension();
        return this;
      };
      WishesMapView.prototype.resetDimension = function() {
        return $(this.el).css({
          width: $(window).width(),
          height: $(window).height()
        });
      };
      WishesMapView.prototype.showNewWishForm = function() {
        return $.facebox((new NewWishView({
          collection: this.collection
        })).render().el);
      };
      return WishesMapView;
    })();
    WishView = (function() {
      __extends(WishView, Backbone.View);
      function WishView() {
        WishView.__super__.constructor.apply(this, arguments);
      }
      WishView.prototype.initialize = function(options) {
        return this.detailWishViewCache = (new DetailWishView({
          model: this.model
        })).render().el;
      };
      WishView.prototype.template = _.template($('#unfilled-wish-template').html());
      WishView.prototype.className = 'wish';
      WishView.prototype.events = {
        'click a.delete': 'destroy',
        'click div.info': 'show'
      };
      WishView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        this.marker = this.addMarker();
        return this;
      };
      WishView.prototype.destroy = function() {
        return this.model.destroy();
      };
      WishView.prototype.show = function(event) {
        return app.Map.focus(this.model.get('lat'), this.model.get('lng'), this.detailWishViewCache);
      };
      WishView.prototype.addMarker = function() {
        return app.Map.addMarker(this.model.get('lat'), this.model.get('lng'), this.detailWishViewCache);
      };
      return WishView;
    })();
    DetailWishView = (function() {
      __extends(DetailWishView, Backbone.View);
      function DetailWishView() {
        DetailWishView.__super__.constructor.apply(this, arguments);
      }
      DetailWishView.prototype.className = 'detail-wish';
      DetailWishView.prototype.template = _.template($('#detail-wish-tempalte').html());
      DetailWishView.prototype.render = function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      };
      return DetailWishView;
    })();
    WishesListView = (function() {
      __extends(WishesListView, Backbone.View);
      function WishesListView() {
        WishesListView.__super__.constructor.apply(this, arguments);
      }
      WishesListView.prototype.template = _.template($('#wishes-menu-template').html());
      WishesListView.prototype.id = 'wishes-menu';
      WishesListView.prototype.initialize = function(options) {
        this.collection.bind('reset', this.render, this);
        this.collection.bind('change', this.render, this);
        this.collection.bind('add', this.render, this);
        return this.collection.bind('remove', this.render, this);
      };
      WishesListView.prototype.render = function() {
        var wish, wishView, _i, _len, _ref;
        $(this.el).html(this.template());
        _ref = this.collection.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          wish = _ref[_i];
          wishView = new WishView({
            model: wish
          });
          this.$('div.wishes-list').append(wishView.render().el);
        }
        return this;
      };
      return WishesListView;
    })();
    this.app = (_ref = window.app) != null ? _ref : {};
    return this.app.AppView = AppView;
  });
}).call(this);
