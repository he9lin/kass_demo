## TODO
* Customized overlay info window.
* Activitie

### 自定义覆盖物

设置自定义覆盖物对象的prototype属性为Overlay的实例，以便继承覆盖物基类。
实现initialize方法，当调用map.addOverlay方法时，API会调用此方法。

实现draw方法。

定义构造函数并继承Overlay

首先您需要定义自定义覆盖物的构造函数，在下面的示例中 我们定义一个名为SquareOverlay的构造函数，它包含中心点和边长两个参数，用来在地图上创建一个方形覆盖物。

// 定义自定义覆盖物的构造函数
function SquareOverlay(center, length, color){
  this._center = center;
  this._length = length;
  this._color = color;
}

// 继承API的BMap.Overlay
SquareOverlay.prototype = new BMap.Overlay();

初始化自定义覆盖物

当调用map.addOverlay方法添加自定义覆盖物时，API会调用该对象的initialize方法用来初始化覆盖物，在初始化过程中需要创建覆盖物所需要的DOM元素，并添加到地图相应的容器中。

地图提供了若干容器供覆盖物展示，通过map.getPanes方法可以得到这些容器元素，它们包括：

floatPane
markerMouseTarget
floatShadow
labelPane
markerPane
mapPane
这些对象代表了不同的覆盖物容器元素，它们之间存在着*覆盖关系*，最上一层为floatPane，用于显示信息窗口内容，下面依次为标注点击区域层、信息窗口阴影层、文本标注层、标注层和矢量图形层。

我们自定义的方形覆盖物可以添加到任意图层上，这里我们选择添加到markerPane上，作为其一个子结点。

// 实现初始化方法
SquareOverlay.prototype.initialize = function(map) {

  // 保存map对象实例
  this._map = map;
  
  // 创建div元素，作为自定义覆盖物的容器
  var div = document.createElement("div");
  div.style.position = "absolute";
  
  // 可以根据参数设置元素外观
  div.style.width = this._length + "px";
  div.style.height = this._length + "px";
  div.style.background = this._color;

  // 将div添加到覆盖物容器中
  map.getPanes().markerPane.appendChild(div);

  // 保存div实例
  this._div = div;

  // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
  // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
  return div;
}

绘制覆盖物

到目前为止，我们仅仅把覆盖物添加到了地图上，但是并没有将它放置在正确的位置上。您需要在draw方法中设置覆盖
物的位置，每当地图状态发生变化（比如：位置移动、级别变化）时，API都会调用覆盖物的draw方法，用于重新计算
覆盖物的位置。通过map.pointToOverlayPixel方法可以将地理坐标转换到覆盖物的所需要的像素坐标。

// 实现绘制方法
SquareOverlay.prototype.draw = function() {

  // 根据地理坐标转换为像素坐标，并设置给容器
  var position = this._map.pointToOverlayPixel(this._center);
  this._div.style.left = position.x - this._length / 2 + "px";
  this._div.style.top = position.y - this._length / 2 + "px";
}

移除覆盖物

当调用map.removeOverlay或者map.clearOverlays方法时，API会自动将initialize方法返回的DOM元素进行移除。

显示和隐藏覆盖物

自定义覆盖物会自动继承Overlay的show和hide方法，方法会修改由initialize方法返回的DOM元素的style.display属性。如果自定义覆盖物元素较为复杂，您也可以自己实现show和hide方法。

// 实现显示方法
SquareOverlay.prototype.show = function(){
  if (this._div){
    this._div.style.display = "";
  }
}

// 实现隐藏方法
SquareOverlay.prototype.hide = function(){
  if (this._div){
    this._div.style.display = "none";
  }
}

自定义其他方法

通过构造函数的prototype属性，您可以添加任何自定义的方法，比如下面这个方法每调用一次就能改变覆盖物的显示状态：

view plainprint
// 添加自定义方法  
SquareOverlay.prototype.toggle = function(){  
  if (this._div){  
    if (this._div.style.display == ""){  
      this.hide();  
    }  
    else {  
      this.show();  
    }  
  }  
}  

添加覆盖物

您现在已经完成了一个完整的自定义覆盖物的编写，可以添加到地图上了。

view plainprint
// 初始化地图  
var map = new BMap.Map("container");  
var point = new BMap.Point(116.404, 39.915);  
map.centerAndZoom(point, 15);  
  
// 添加自定义覆盖物  
var mySquare = new SquareOverlay(map.getCenter(), 100, "red");  
map.addOverlay(mySquare);  