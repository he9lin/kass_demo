(function() {
  var Map, _ref;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Map = (function() {
    function Map() {}
    Map.prototype.render = function(collection) {
      this.map = new BMap.Map('map');
      this.map.centerAndZoom(new BMap.Point(121.491, 31.233), 11);
      return this.map.addControl(new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_RIGHT
      }));
    };
    Map.prototype.focus = function(lat, lng, content) {
      var point;
      point = new BMap.Point(lat, lng);
      this.showInfoWindow(content, point);
      return this.map.panTo(point);
    };
    Map.prototype.addMarker = function(lat, lng, content) {
      var marker, myIcon, point;
      point = lng === void 0 ? lat : new BMap.Point(lat, lng);
      myIcon = new BMap.Icon("marker.png", new BMap.Size(48, 66), {
        offset: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, 0)
      });
      marker = new BMap.Marker(point, {
        icon: myIcon
      });
      marker.addEventListener("click", __bind(function(event) {
        return this.focus(lat, lng, content);
      }, this));
      this.map.addOverlay(marker);
      return marker;
    };
    Map.prototype.showInfoWindow = function(content, lat, lng) {
      var point, w;
      point = lng === void 0 ? lat : new BMap.Point(lat, lng);
      w = new window.WishOverlay(content, point);
      if (this.currentOverlay) {
        this.currentOverlay.hide();
      }
      this.currentOverlay = w;
      return this.map.addOverlay(this.currentOverlay);
    };
    return Map;
  })();
  this.app = (_ref = window.app) != null ? _ref : {};
  this.app.Map = new Map;
}).call(this);
