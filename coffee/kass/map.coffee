class Map
  constructor: ->
    @map = new BMap.Map 'map'
    @map.centerAndZoom(new BMap.Point(121.491, 31.233), 11)
    @map.addControl(new BMap.NavigationControl anchor: BMAP_ANCHOR_TOP_RIGHT)
    
    # so max range is just after the dot. set a center point.
    @addMarker new BMap.Point(121.191, 30.933)
    @addMarker new BMap.Point(121.291, 31.033)
    @addMarker new BMap.Point(121.391, 31.133)
    @addMarker new BMap.Point(121.491, 31.233)
    @addMarker new BMap.Point(121.591, 31.333)
    @addMarker new BMap.Point(121.691, 31.433)
    @addMarker new BMap.Point(121.791, 31.533)
    @addMarker new BMap.Point(121.891, 31.633)
    
  addMarker: (point) ->
    myIcon = new BMap.Icon "marker.png", new BMap.Size(48, 66),
      offset:      new BMap.Size(10, 25)  
      imageOffset: new BMap.Size(0, 0)
      
    marker = new BMap.Marker point, icon: myIcon
    
    marker.addEventListener "click", (event) =>
      @showInfoWindow point
      @map.panTo point

    @map.addOverlay marker
    
  showInfoWindow: (point) ->
    sContent =
      "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + 
      "<img style='float:right;margin:4px' id='imgDemo' src='http://openapi.baidu.com/map/images/tiananmen.jpg' width='139' height='104' title='天安门'/>" + 
      "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...</p>" + 
      "</div>"
    opts =
      width : 250
      height: 100    
      title : "Hello" 
    
    infoWindow = new BMap.InfoWindow sContent
    @map.openInfoWindow infoWindow, point
  
@app = window.app ? {}
@app.Map = Map