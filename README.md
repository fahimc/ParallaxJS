ParallaxJS
==========
# About  
This library is a easy way to create a full screen parallax site. You can use the API to set css for the starting points and it will move to the default css positions.  

You can also hook into the API's events and add a callback method for when a view is coming into view and out of view. A percentage is passed through to give you an indication of how much of the page is in view.  

Finally there is a **'ON_CHANGE'** event which is triggered when a page changes to the next page. An page index is passed to the callback method.  

##Demo
[Demo 1](http://8fc.co.uk/preview/parallaxjs/)

# How to Use This Library

### HTML Setup  

Add the following script to the HTML head tag.  
```
<script type="text/javascript" src="release/parallaxjs-fc-v0.1-min.js"></script>  
```

Download it from this location:  
[Parallax JS Download](https://github.com/fahimc/ParallaxJS/tree/master/release)

(Optional)
Add GreenSock's TweenLite and the following plugins for smoother transitions. 
```
<script type="text/javascript" src="lib/com/greensock/TweenLite.js"></script> 
<script type="text/javascript" src="lib/com/greensock/plugins/CSSPlugin.js"></script>
<script type="text/javascript" src="lib/com/greensock/plugins/CSSRulePlugin.js"></script>
<script type="text/javascript" src="lib/com/greensock/plugins/ScrollToPlugin.js"></script>
<script type="text/javascript" src="lib/com/greensock/easing/EasePack.js"></script>
```

In the 'body' tag add a div and give it an id of 'parallaxHolder'. This div will be where you add all the pages for the parallax. 

### Example:
```
<div id="parallaxHolder">
...
</div>
```

Within the holder you have to add **DIVs** for page which will hold elements for each those pages. You should give them all IDs so you can reference them later. Each Page will automatically be made fullscreen so you do not need to worry about adding width and height in the css.
### Example:
```
<div id="parallaxHolder">
<div id="view1">
</div>
<div id="view2">
</div>
<div id="view3">
</div>
</div>
```

###Setup your JavaScript  

You will need to create a method to listen for when the site has fully loaded, such as JQuery's 'ready' method or by adding a listener to the 'load' method on the 'window'.  

Within  this method you need to call 'Parallax.init()' method to initialise API.

### Example: 
```

if (window.addEventListener) {
	window.addEventListener("load", onLoad);
} else {
	window.attachEvent("onload", onLoad);
}

function onLoad() {
  Parallax.init();
}
```

# Adding Starting Points for Elements  
To add start points for any element you need to call the 'setStartPoint' method. This method takes in the following parameters:  

    setStartPoint(viewId:String,elementId:String,css:JSONObject);  
* viewId: This is the ID of the view/page in which the element sits.  
* elementId: This is the ID of the element.
* css: This is an object which contains the css for the starting points. The keys(names) of each attributes within the css object will be the css attribute name using camelcase not hyphenated i.e __'{left:"100%",fontSize:"10px",top:"50%",opacity:"0px"}'__. The value will be a String value of the css starting points.  

### Example:  

```
Parallax.setStartPoint("view2","slideIn",{left:"-300px"});
Parallax.setStartPoint("view2","slideBack",{left:"100%",fontSize:"10px",top:"50%",opacity:"0px"});
Parallax.setStartPoint("view3","girl",{left:"60%"});
```

# Add Callbacks To When A Page is View or Moving Out
To add a listener to 'VIEW_OUT' or 'VIEW_IN' you call the 'Parallax.addListener' method and add the following parameters:  

    Parallax.addListener(viewId:String,eventName:String,callbackFunciton:Function);  
* viewId: This is the ID of the view/page you want to listen to.  
* eventName: This is the name of the event. Either **'VIEW_IN'** for when the page is in view or **'VIEW_OUT'** for when the page moves out of view.  
* callbackFunciton: This is your callback function.     

### Example:  

```
function onLoad() {
...
Parallax.addListener("view1","VIEW_OUT",view1MovesOut);
Parallax.addListener("view2","VIEW_IN",view2MovesIn);
...
}
function view1MovesOut(percent)
{
	console.log("view 1 moves out",percent);
};
function view2MovesIn(percent)
{
	console.log("view 2 moves in",percent);
		
};
```

# Listening To When A Page Changes
To add a callback for every time the current page changes you can add a listener to the 'ON_CHANGE' event. Use the 'Parallax.addListener' method listen to the event. It will return the index of the page. The index is based on the children within the holder.

  Parallax.addListener(viewId:String,eventName:String,callbackFunciton:Function);  
* viewId: This is the ID of the view/page you want to listen to.  
* eventName: This is the name of the event. Either **'VIEW_IN'** for when the page is in view or **'VIEW_OUT'** for when the page moves out of view.  
* callbackFunciton: This is your callback function.     

### Example:  

```
function onLoad() {
...
Parallax.addListener("parallaxHolder","ON_CHANGE",onChange);
...
}
function onChange(index)
{
 console.log("page has changed to ",index);
}

   
