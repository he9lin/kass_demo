(function() {
  var Map, _ref;

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

    Map.prototype.addMarker = function(lat, lng) {
      var marker, myIcon, point,
        _this = this;
      point = lng === void 0 ? lat : new BMap.Point(lat, lng);
      myIcon = new BMap.Icon("marker.png", new BMap.Size(48, 66), {
        offset: new BMap.Size(10, 25),
        imageOffset: new BMap.Size(0, 0)
      });
      marker = new BMap.Marker(point, {
        icon: myIcon
      });
      marker.addEventListener("click", function(event) {
        _this.showInfoWindow('<h1>TOOD</h1>', point);
        return _this.map.panTo(point);
      });
      this.map.addOverlay(marker);
      return marker;
    };

    Map.prototype.showInfoWindow = function(content, lat, lng) {
      var infoWindow, point;
      point = lng === void 0 ? lat : new BMap.Point(lat, lng);
      infoWindow = new BMap.InfoWindow(content);
      return this.map.openInfoWindow(infoWindow, point);
    };

    return Map;

  })();

  this.app = (_ref = window.app) != null ? _ref : {};

  this.app.Map = new Map;

}).call(this);
