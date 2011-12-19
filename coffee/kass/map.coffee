class Map
  constructor: ->
    
  render: (collection) ->
    @map = new BMap.Map 'map'
    @map.centerAndZoom(new BMap.Point(121.491, 31.233), 11)
    @map.addControl(new BMap.NavigationControl anchor: BMAP_ANCHOR_TOP_RIGHT)
    
  focus: (lat, lng, content) ->
    point = new BMap.Point lat, lng
    @showInfoWindow content, point
    @map.panTo point
    
  addMarker: (lat, lng, content) ->
    point = if lng is undefined
      lat
    else
      new BMap.Point lat, lng
    
    # Make an icon for the marker
    myIcon = new BMap.Icon "marker.png", new BMap.Size(48, 66),
      offset:      new BMap.Size(10, 25)  
      imageOffset: new BMap.Size(0, 0)
      
    marker = new BMap.Marker point, icon: myIcon
    
    marker.addEventListener "click", (event) =>
      @focus lat, lng, content

    @map.addOverlay marker
    marker
    
  showInfoWindow: (content, lat, lng) ->
    point = if lng is undefined
      lat
    else
      new BMap.Point lat, lng
    # opts =
    #   width : 250
    #   height: 100    
    #   title : "Hello" 
    
    infoWindow = new BMap.InfoWindow content
    @map.openInfoWindow infoWindow, point
  
@app = window.app ? {}
@app.Map = new Map