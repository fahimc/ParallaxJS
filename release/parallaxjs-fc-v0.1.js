var Class={_super:function(e,t,n){e.baseConstructor[t].apply(e,Array.prototype.slice.call(arguments,2))},extend:function(e,t){e.prototype=new t;e.prototype.baseConstructor=new t;return e.prototype},implement:function(e,t){for(var n in t){if(!e.prototype[n])e.prototype[n]=t[n]}}};(function(e){e.Utensil={_stage:e,stage:function(t,n){if(t!=undefined){this._stage=t;if(n)this._stage.style.position="relative"}return this._stage==e?document.body:this._stage},addChild:function(e){document.body.appendChild(e)},stageWidth:function(t){if(t)return e.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;return this.stage()==e?e.innerWidth||document.documentElement.clientWidth||document.body.clientWidth:parseInt(this.stage().style.width.replace("px",""))>0?parseInt(this.stage().style.width.replace("px","")):this.stage().clientWidth},stageHeight:function(t){if(t)return e.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;return this.stage()==e?e.innerHeight||document.documentElement.clientHeight||document.body.clientHeight:parseInt(this.stage().style.height.replace("px",""))>0?parseInt(this.stage().style.height.replace("px","")):this.stage().clientHeight},getX:function(e,t){if(t){var n=0;var r=0;if(e.offsetParent){do{n+=e.offsetLeft;r+=e.offsetTop}while(e=e.offsetParent)}return n}return isNaN(parseInt(e.style.left.replace("px","")))?0:parseInt(e.style.left.replace("px",""))},getY:function(e,t){if(t){var n=0;if(e.offsetParent)while(1){n+=e.style.top;if(!e.offsetParent)break;e=e.offsetParent}else if(e.y)n+=e.y;return n}return isNaN(parseInt(e.style.top.replace("px","")))?0:parseInt(e.style.top.replace("px",""))},getWidth:function(e){return isNaN(parseInt(e.style.width.replace("px","")))?0:parseInt(e.style.width.replace("px",""))},getHeight:function(e){return isNaN(parseInt(e.style.height.replace("px","")))?0:parseInt(e.style.height.replace("px",""))},trace:function(){var e="";for(var t in arguments){e+=arguments[t]+","}alert(e)},resetStyle:function(e){e.style.position="absolute";e.style.margin="0";e.style.padding="0"},mouseX:function(e,t){var n;if(t.pageX){n=t.pageX}else{n=t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft}n-=e.offsetLeft;return n},mouseY:function(e,t){var n;if(t.pageY){n=t.pageY}else{n=t.clientY+document.body.scrollTop+document.documentElement.scrollTop}n-=e.offsetTop;return n},mouseLeave:function(t){if(!t)var t=e.event;var n=e.event?t.srcElement:t.target;var r=t.relatedTarget?t.relatedTarget:t.toElement;while(r!=n&&r.nodeName!="BODY")r=r.parentNode;if(r==n)return},ImageLoader:function(e,t){var n=new Image;n.onload=function(){t(n)};n.src=e},postURL:function(e,t,n){n=n||"post";var r=document.createElement("form");r.setAttribute("method",n);r.setAttribute("action",e);var i=document.createElement("input");i.setAttribute("type","hidden");i.setAttribute("name","data");i.setAttribute("value",t);r.appendChild(i);document.body.appendChild(r);r.submit()},URLLoader:{xhttp:"",cb:"",load:function(t,n,r,i){this.cb=n;if(e.XMLHttpRequest){this.xhttp=new XMLHttpRequest}else{this.xhttp=new ActiveXObject("Microsoft.XMLHTTP")}if(!r)r="GET";if(r=="GET"&&i){t+="?"+i}var s=this;this.xhttp.onreadystatechange=function(){s.onStatus()};this.xhttp.open(r,t,true);if(r=="POST"){this.xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");this.xhttp.setRequestHeader("Content-length",i.length);this.xhttp.setRequestHeader("Connection","close")}try{this.xhttp.send(i)}catch(o){}},onStatus:function(t){if(this.xhttp.readyState==4){if(this.xhttp.status==200||e.location.href.indexOf("http")==-1){this.cb(this.xhttp.responseText,this.xhttp.responseXML)}else{}}else{}}},Browser:{getInternetExplorerVersion:function(){var e=-1;if(navigator.appName=="Microsoft Internet Explorer"){var t=navigator.userAgent;var n=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");if(n.exec(t)!=null)e=parseFloat(RegExp.$1)}return e},isIE:navigator.appVersion.indexOf("MSIE")!=-1,isIE9:function(){return Utensil.Browser.getInternetExplorerVersion()>8},isMobile:/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())},getTarget:function(e){return e.currentTarget?e.currentTarget:e.srcElement},events:{},addListener:function(e,t,n){if(e.attachEvent){e.attachEvent("on"+t,n)}else{e.addEventListener(t,n)}},removeListener:function(e,t,n){if(e.detachEvent){e.detachEvent("on"+t,n)}else{e.removeEventListener(t,n)}},loadParams:{getValue:function(t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n="[\\?&]"+t+"=([^&#]*)";var r=new RegExp(n);var i=r.exec(e.location.href);if(i==null)return"";else return i[1]},getHostURL:function(){var e=new String(document.URL.replace(/\/[^\/]+$/,""));if(e.charAt(e.length-1)!="/")e=e+"/";return e}},addPackage:function(e,t){var n=this;if(t&&!this[t]){this[t]={};n=this[t]}for(var r in e){var i=e[r];n[r]=i}}}})(window);var Event={COMPLETE:"EVENT_COMPLETE",PROGRESS:"EVENT_PROGRESS",addListener:function(e,t,n,r){var i=[];var s=arguments.length;for(var o=0;o<s;o++){i.push(arguments[o])}i=i.length>3?i.splice(3,i.length-1):[];if(!e.listeners)e.listeners={};if(typeof e.listeners[t]!="undefined"){e.listeners[t].push({scope:r,callback:n,args:i})}else{e.listeners[t]=[{scope:r,callback:n,args:i}]}},removeListener:function(e,t,n,r){if(typeof e.listeners[t]!="undefined"){var i=e.listeners[t].length;var s=[];for(var o=0;o<i;o++){var u=e.listeners[t][o];if(u.scope==r&&u.callback==n){}else{s.push(u)}}e.listeners[t]=s}},dispatch:function(e,t,n,r){var i=0;var s={type:t,target:n,args:r};var r=[];var o=arguments.length;for(var u=0;u<o;u++){r.push(arguments[u])}r=r.length>2?r.splice(2,r.length-1):[];r=[s].concat(r);if(e.listeners&&typeof e.listeners[t]!="undefined"){var a=e.listeners[t].length;for(var u=0;u<a;u++){var f=e.listeners[t][u];if(f&&f.callback){f.args=r.concat(f.args);f.callback.apply(f.scope,f.args);i+=1}}}}};var ResourceManager={assetJson:[],assets:null,copyUrl:null,copy:null,currentIndex:0,currentAsset:null,images:[],totalAssets:0,preloadImages:true,addAssets:function(e){this.assetJson.push(e)},addCopy:function(e){if(typeof e=="string"){this.copyUrl=e}else{this.copy=e}},mergeObjects:function(){this.assets={};for(var e=0;e<this.assetJson.length;e++){for(prop in this.assetJson[e]){this.assets[prop]=this.assetJson[e][prop]}}this.assetJson=null},init:function(){this.currentIndex=0;this.checkAssetJson(this.currentIndex)},checkAssetJson:function(e){if(this.assetJson[e]){this.currentIndex=e;if(typeof this.assetJson[e]=="string"){Utensil.URLLoader.load(this.assetJson[e],this.onAssetLoaded)}else{this.onAssetLoaded()}}else{this.assetsInitialised()}},assetsInitialised:function(){this.currentIndex=0;this.mergeObjects();this.loadAsset()},loadAsset:function(){if(this.assets){var e=0;for(var t in this.assets){if(e==this.currentIndex){this.currentAsset=this.assets[t];this.currentAsset.name=t}e++}this.totalAssets=e;var n=this;if(this.currentAsset!=null&&this.currentAsset.path!=null){this.currentIndex++;var r=this.currentAsset.path.split(".");var i=r[r.length-1];var s=i.toLowerCase().indexOf("jpg")>=0||i.toLowerCase().indexOf("jpeg")>=0||i.toLowerCase().indexOf("png")>=0||i.toLowerCase().indexOf("gif")>=0;if(this.preloadImages==true&&s){var o=new Image;this.images[this.currentAsset.name]=o;Utensil.addListener(o,"load",function(){n.onAssetComplete()});o.src=this.currentAsset.path}else{n.onAssetComplete()}}}},onAssetComplete:function(e){this.currentAsset=null;if(this.currentIndex>=this.totalAssets){this.currentIndex=0;if(this.copyUrl){Utensil.URLLoader.load(this.copyUrl,this.onCopyLoaded)}else{Event.dispatch(this,Event.COMPLETE)}}else{this.loadAsset()}},onAssetLoaded:function(t,x){if(t)ResourceManager.assetJson[ResourceManager.currentIndex]=eval("("+t+")");ResourceManager.currentIndex++;ResourceManager.checkAssetJson(ResourceManager.currentIndex)},onCopyLoaded:function(t,x){ResourceManager.copy=eval("("+t+")");Event.dispatch(ResourceManager,Event.COMPLETE)},getAssetByName:function(e){for(var t in this.assets){if(t==e){var n=this.assets[t];var r=n.path.split(".")[1];var i=r.toLowerCase().indexOf("jpg")>=0||r.toLowerCase().indexOf("jpeg")>=0||r.toLowerCase().indexOf("png")>=0||r.toLowerCase().indexOf("gif")>=0;if(this.preloadImages==true&&i){var s=this.images[n.name];return s}else{return n}}}return null},getCopyByID:function(e){if(this.copy[e])return this.copy[e]}};var Int=function(e){return parseInt(e)};var Layout=function(){};Layout.prototype={verticalGap:0,horizontalGap:0,left:0,top:0,bottom:0,right:0,arrange:function(e){}};var VerticalLayout=function(){this.arrange=function(e){var t=e.childContainer;var n=0;for(var r=0;r<t.childNodes.length;r++){var i=t.childNodes[r];i.style.top=n+"px";var s=i.clientHeight;if(s==0)s=i.style.height.replace("px","");n+=parseInt(s)+this.verticalGap}}};Class.extend(VerticalLayout,Layout);var HorizontalLayout=function(){this.arrange=function(e){var t=e.childContainer;var n=0;for(var r=0;r<t.childNodes.length;r++){var i=t.childNodes[r];i.style.left=n+"px";var s=i.clientWidth;if(s==0)s=i.style.width.replace("px","");n+=parseInt(s)+this.horizontalGap}}};Class.extend(HorizontalLayout,Layout);var PaddedLayout=function(){this.arrange=function(e){var t=e.childContainer;for(var n=0;n<t.childNodes.length;n++){var r=t.childNodes[n];var i=parseInt(r.style.left.replace("px","")?r.style.left.replace("px",""):0);var s=parseInt(r.style.top.replace("px","")?r.style.top.replace("px",""):0);r.style.top=parseInt(s+this.top)+"px";r.style.left=parseInt(i+this.left)+"px"}}};Class.extend(PaddedLayout,Layout);var GridLayout=function(){this.arrange=function(e){var t=e.wrapper?e.wrapper:e.childContainer;var n=this.left;var r=this.top;var i=0;var s=0;var o=parseInt(e.width()-this.right);this.clearGrid(t);for(var u=0;u<t.childNodes.length;u++){var a=t.childNodes[u];if(a.className.indexOf("scroll")<0&&a.className.indexOf("mcontentwrapper")<0){var f=parseInt(a.style.left.replace("px","")?a.style.left.replace("px",""):0);var l=parseInt(a.style.top.replace("px","")?a.style.top.replace("px",""):0);if(u>0){if(n+parseInt(a.clientWidth)>=o){s++;i=0;n=this.left}}if(s>0){var c=this.getChildHeight(t,s-1,i);r=parseInt(c.y)+parseInt(c.height)+parseInt(this.verticalGap)}a.style.top=parseInt(r)+"px";a.style.left=parseInt(n)+"px";a.setAttribute("gridCol",i);a.setAttribute("gridRow",s);n+=parseInt(a.clientWidth)+parseInt(this.horizontalGap);i++}}};this.getChildHeight=function(e,t,n){for(var r=0;r<e.childNodes.length;r++){var i=e.childNodes[r];if(parseInt(i.getAttribute("gridCol"))==n&&parseInt(i.getAttribute("gridRow"))==t){return{height:i.clientHeight,y:parseInt(i.style.top.replace("px","")?i.style.top.replace("px",""):0)}}}};this.clearGrid=function(e){for(var t=0;t<e.childNodes.length;t++){var n=e.childNodes[t];n.setAttribute("gridCol","");n.setAttribute("gridRow","")}}};Class.extend(GridLayout,Layout);var ScrollLayout=function(){this.arrange=function(e){if(!window.scrollerIndex)window.scrollerIndex=0;if(!this.trackId)this.trackId+=window.scrollerIndex;if(!this.holderId)this.holderId+=window.scrollerIndex;if(!this.thumbId)this.thumbId+=window.scrollerIndex;if(!this.thumbId)window.scrollerIndex++;this.e=e;var t=e.childContainer;e.height(this.scrollHeight);this.maxHeight=e.childContainer.clientHeight;for(var n=0;n<e.childContainer.childNodes.length;n++){var r=e.childContainer.childNodes[n];var i=r.style.top?r.style.top.replace("px",""):0;var s=r.clientHeight;var o=parseInt(i)+parseInt(s);if(o>this.maxHeight){this.maxHeight=o}}if(this.maxHeight>this.scrollHeight){this.childHeight(e.childContainer,this.maxHeight);this.removeScroller();this.createScrollbar(e);e.width(e.width()-this.track.clientWidth);this.childX(this.track,parseInt(e.width()))}else{var u=this.removeScroller();e.width(e.width()+u)}};this.createScrollbar=function(e){if(!e)return;var t=e.childContainer;if(!this.holder){this.holder=document.createElement("div");this.holder.id=this.holderId;this.holder.style.overflow="hidden";this.holder.style.position="relative";this.childHeight(this.holder,this.scrollHeight);e.display.removeChild(t);this.holder.appendChild(t);e.display.appendChild(this.holder)}if(!this.track){this.track=document.createElement("div");this.track.id=this.trackId;this.resetStyle(this.track);this.track.className=this.trackStyle;this.childHeight(this.track,this.scrollHeight);e.addUIChild(this.track);this.childX(this.track,parseInt(e.width()));this.childWidth(t,parseInt(e.width())-parseInt(this.horizontalGap));this.childWidth(this.holder,parseInt(e.width())-parseInt(this.horizontalGap))}if(!this.thumb){this.thumb=document.createElement("div");this.thumb.id=this.thumbId;this.resetStyle(this.thumb);this.thumb.className=this.thumbStyle;this.thumb.style.cursor="pointer";var n=this.scrollHeight/this.maxHeight;this.childHeight(this.thumb,n*this.scrollHeight);this.track.appendChild(this.thumb);var r=this;this.onMouseDownHandler=function(e){r.onMouseDown(e)};this.onScrollWheelHandler=function(e){r.onScrollWheel(e)};Utensil.addListener(this.thumb,"mousedown",this.onMouseDownHandler);this.addEvent(e.display,"mousewheel",this.onScrollWheelHandler)}};this.removeScroller=function(){var e=this.e.childContainer;var t=0;if(this.track){t=this.track.clientWidth;if(document.getElementById(this.trackId))document.getElementById(this.trackId).parentNode.removeChild(this.track);this.track=null}if(this.thumb){if(document.getElementById(this.thumbId))document.getElementById(this.thumbId).parentNode.removeChild(this.thumb);Utensil.removeListener(this.thumb,"mousedown",this.onMouseDownHandler);this.thumb=null;if(this.holder){if(document.getElementById(this.holderId)){this.e.display.removeChild(this.holder);this.holder.removeChild(e)}this.e.display.appendChild(e);this.holder=null}}this.removeEvent(this.e.display,"mousewheel",this.onScrollWheelHandler);this.reset();return t};this.reset=function(){this.e.childContainer.style.top="0px"};this.onScrollWheel=function(e){e=e?e:window.event;var t=e.detail?e.detail*-1:e.wheelDelta/40;this.startY=parseInt(this.childY(this.thumb))+Number(t);this.onMouseMove(e,parseInt(this.childY(this.thumb))-Number(t*10))};this.onMouseDown=function(e){this.startX=Utensil.mouseX(document.body,e);this.startY=Utensil.mouseY(document.body,e)-this.childY(this.thumb);var t=this;this.onMouseMoveHandler=function(e){t.onMouseMove(e)};this.onMouseUpHandler=function(e){t.onMouseUp(e)};Utensil.addListener(document,"mousemove",this.onMouseMoveHandler);Utensil.addListener(document,"mouseup",this.onMouseUpHandler);if(e&&e.preventDefault){e.preventDefault()}else{window.event.returnValue=false}return false};this.onMouseMove=function(e,t){var n=t!=undefined?t:Utensil.mouseY(document.body,e)-this.startY;var r=0;if(n<=0)n=0;if(Number(n)+parseInt(this.thumb.clientHeight)>=this.scrollHeight){n=this.scrollHeight-parseInt(this.thumb.clientHeight);r=this.paddingBottom}this.childY(this.thumb,n);var i=this.maxHeight/this.scrollHeight;this.e.childContainer.style.top=-(parseInt(this.childY(this.thumb)*i)+r)+"px";if(e&&e.preventDefault){e.preventDefault()}else{window.event.returnValue=false}return false};this.onMouseUp=function(e){Utensil.removeListener(document,"mousemove",this.onMouseMoveHandler);Utensil.removeListener(document,"mouseup",this.onMouseUpHandler)};this.childX=function(e,t){if(t==undefined){return e.style.left?e.style.left.replace("px",""):0}else{e.style.left=t+"px"}};this.childY=function(e,t){if(t==undefined){return e.style.top?e.style.top.replace("px",""):0}else{e.style.top=t+"px"}};this.childWidth=function(e,t){if(t==undefined){return e.style.width?e.style.width.replace("px",""):0}else{e.style.width=t+"px"}};this.childHeight=function(e,t){if(t==undefined){return e.style.height?e.style.height.replace("px",""):0}else{e.style.height=t+"px"}};this.resetStyle=function(e){e.style.position="absolute";e.style.top="0px"};this.addEvent=function(e,t,n){if(typeof e=="string")e=document.getElementById(e);if(e==null)return;if(e.addEventListener){if(t=="mousewheel")t=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel";e.addEventListener(t,n,false)}else if(e.attachEvent)e.attachEvent("on"+t,n)};this.removeEvent=function(e,t,n){if(typeof e=="string")e=document.getElementById(e);if(e==null)return;if(e.removeEventListener){if(t=="mousewheel")t=/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel";e.removeEventListener(t,n,false)}else if(e.detachEvent)e.detachEvent("on"+t,n)}};Class.extend(ScrollLayout,Layout);var _=ScrollLayout.prototype;_.track;_.thumb;_.holder;_.scrollHeight=10;_.paddingBottom=10;_.trackStyle="scrollTrack";_.thumbStyle="scrollThumb";_.holderId="scrollHolder";_.trackId="scrollTrack";_.thumbId="scrollThumb";_.e;_.startX;_.startY;_.maxHeight=0;var DisplayObject=function(){this.display=null;this.elemName="div"};DisplayObject.prototype={props:{},style:function(e){e.style.position="absolute"},init:function(){var e=document.createElement(this.elemName);this.display=e;for(prop in this.props){this.styleProp(prop,this.props[prop].value,this.props[prop].suffix)}this.style(e)},styleProp:function(e,t,n){if(!this.display){this.props[e]={value:t,suffix:n};return t}if(t!=undefined){this.display.style[e]=t+(n?n:"")}else{return this.display.style[e]?this.display.style[e].replace("px",""):""}},className:function(e){if(e!=undefined){this.display.className=e}else{return this.display.className}},x:function(e){return Number(this.styleProp("left",e,"px"))},y:function(e){return Number(this.styleProp("top",e,"px"))},width:function(e){return Number(this.styleProp("width",e,"px"))},height:function(e){return Number(this.styleProp("height",e,"px")!=""?this.styleProp("height",e,"px"):this.display.clientHeight)},visible:function(e){if(e!=undefined){e==true?e="visible":e="hidden";this.styleProp("visibility ",e)}else{return this.styleProp("visibility ",e)=="visible"?true:false}},alpha:function(e){if(e!=undefined){this.props.alpha=e;if(this.display){this.display.style["opacity"]=e;this.display.style["-khtml-opacity"]=e;this.display.style["-moz-opacity"]=e;this.display.style["filter"]="alpha(opacity="+e*100+")"}}else{return Number(this.props.alpha==undefined?1:this.props.alpha)}},buttonMode:function(e){if(e==true){this.display.style.cursor="pointer"}else{this.display.style.cursor="auto"}},startX:function(){var e=this.x();if(Utensil.getX(this.display,true)>e){return Utensil.getX(this.display,true)-e}return e},startY:function(){var e=this.y();if(Utensil.getY(this.display,true)>e){return Utensil.getY(this.display,true)-e}return e},startDrag:function(){var e="mousemove";if("ontouchstart"in document.documentElement)e="ontouchstart";var t=this;var n=this.startX();var r=this.startY();this.dragHandler=function(e){t.onDragMove(e,n,r)};Utensil.addListener(document,e,this.dragHandler)},onDragMove:function(e,t,n){this.x(Utensil.mouseX(document.body,e)-t);this.y(Utensil.mouseY(document.body,e)-n)},stopDrag:function(){var e="mousemove";if("ontouchstart"in document.documentElement)e="ontouchstart";Utensil.removeListener(document,e,this.dragHandler)},hitTestObject:function(e){var t=parseInt(this.x());var n=parseInt(e.x());var r=t+parseInt(this.width());var i=n+parseInt(e.width());var s=parseInt(this.y());var o=parseInt(e.y());var u=s+parseInt(this.height());var a=o+parseInt(e.height());if(r>=n&&t<=i){}else{return false}if(u>=o&&s<=a){}else{return false}return true},hitTestPoint:function(e,t){if(e>=this.x()&&e<=parseInt(this.x())+parseInt(this.width())&&t>=this.y()&&t<=parseInt(this.y())+parseInt(this.height())){return true}return false},rotation:function(e){this.rotateObj(this.display,e)},rotateObj:function(e,t){deg_str=t+"";rotate_transform="rotate("+t+"deg)";matrix_str=this.degreeToIEMatrix(t);filter_str="progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', "+matrix_str+")";e.style["rotation"]=deg_str+"deg";e.style["-ms-transform"]=rotate_transform;e.style.MozTransform=rotate_transform;e.style.OTransform=rotate_transform;e.style.WebkitTransform=rotate_transform;radians=parseInt(t)*Math.PI*2/360;calSin=Math.sin(radians);calCos=Math.cos(radians);if(e.style.filter){e.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+calCos+", M12=-"+calSin+",M21="+calSin+", M22="+calCos+', sizingMethod="auto expand")'}if(e.style["ms-filter"])e.style["ms-filter"]="progid:DXImageTransform.Microsoft.Matrix(M11="+calCos+", M12=-"+calSin+",M21="+calSin+", M22="+calCos+', sizingMethod="auto expand")';if(Utensil.Browser.isIE&&Utensil.Browser.getInternetExplorerVersion()<9){e.style.filter=filter_str;e.style["ms-filter"]=filter_str;e.style["zoom"]="1"}},degreeToIEMatrix:function(e){var t=Math.PI*2/360;var n=e*t;var r=Math.cos(n);var i=Math.sin(n);var s=r;var o=-i;var u=i;var a=r;return"M11="+s+", M12="+o+", M21="+u+", M22="+a}};var UIElement=function(){};(function(){var e=Class.extend(UIElement,DisplayObject);e.layoutCollection=null;e.childContainer=null;e.state="";e.handlers={};e.build=function(){Class._super(this,"init");var e=document.createElement("div");this.childContainer=e;this.display.appendChild(e);this.styleChildContainer()};e.styleChildContainer=function(){this.childContainer.style.position="relative";this.childContainer.style.display="block"};e.addChild=function(e){this.childContainer.appendChild(e.display?e.display:e)};e.removeChild=function(e){this.childContainer.removeChild(e.display?e.display:e)};e.addUIChild=function(e){this.display.appendChild(e.display?e.display:e)};e.removeUIChild=function(e){if(!e)return;this.display.removeChild(e.display?e.display:e)};e.layout=function(e){if(!this.layoutCollection)this.layoutCollection=[];if(e!=undefined&&typeof e=="object"){this.layoutCollection.push(e)}else if(e!=undefined&&typeof e=="function"){for(var t=0;t<this.layoutCollection.length;t++){if(this.layoutCollection[t]instanceof e){return this.layoutCollection[t]}}}else{return this.layoutCollection[this.layoutCollection.length-1]}return null};e.removeLayout=function(e){if(e!=undefined&&typeof e=="function"){for(var t=0;t<this.layoutCollection.length;t++){if(this.layoutCollection[t]instanceof e){delete this.layoutCollection[t];this.layoutCollection.splice(t,1)}}}};e.createHandler=function(e,t){var n=e;e.handlers[t]=function(e){n[t](e)};return e.handlers[t]};e.removeHandler=function(e,t){if(e.handlers[t]){delete e.handlers[t]}};e.setStyle=function(){};e.arrange=function(){if(!this.layoutCollection)return;for(var e=0;e<this.layoutCollection.length;e++){this.layoutCollection[e].arrange(this)}};e.bareWidth=function(){return this.childContainer.clientWidth};e.bareHeight=function(){return this.childContainer.clientHeight}})();var Label=function(){this.field;this.text=function(e){if(!this.field){this.field=document.createElement("div");this.field.style.position="relative";this.addChild(this.field)}if(e!=undefined){this.field.innerHTML=e}else{return this.field.innerHTML}}};(function(){var e=Class.extend(Label,UIElement)})();var Button=function(){};(function(){var e=Class.extend(Button,UIElement);e.bgImage=null;e.buttonMouseOver=null;e.buttonMouseOut=null;e.buttonMouseClick=null;e.labelClassName=function(e){this.label.className(e)};e.label=null;e.build=function(){Class._super(this,"build");this.label=new Label;this.label.build();this.label.text("");this.addChild(this.label);this.disableSelection(this.label.display)};e.setStyle=function(){Class._super(this,"setStyle");this.label.width(this.width());if(!this.labelClassName){this.label.display.style.textAlign="center"}};e.asset=function(e){if(e){this.bgImage=new Image;this.bgImage.src=typeof e=="object"?e.src:e;this.display.style.backgroundImage="url("+this.bgImage.src+")"}};e.text=function(e){if(e!=undefined){this.label.display.innerHTML=e}else{return this.label.displayinnerHTML}};e.activate=function(){this.display.style.cursor="pointer";var e=this;this.buttonMouseOver=function(t){e.onMouseOver(t)};this.buttonMouseOut=function(t){e.onMouseOut(t)};this.buttonMouseClick=function(t){e.onMouseClick(t)};Utensil.addListener(this.display,"mouseover",this.buttonMouseOver);Utensil.addListener(this.display,"mouseout",this.buttonMouseOut);Utensil.addListener(this.display,"mousedown",this.buttonMouseClick)};e.deactivate=function(){this.display.style.cursor="default";Utensil.removeListener(this.display,"mouseover",this.buttonMouseOver);Utensil.removeListener(this.display,"mouseout",this.buttonMouseOut);Utensil.removeListener(this.display,"mousedown",this.buttonMouseClick);this.buttonMouseOver=null;this.buttonMouseOut=null};e.onMouseOver=function(e){this.display.style.backgroundPosition="0px -"+this.height()+"px"};e.onMouseOut=function(e){this.display.style.backgroundPosition="0px "+"0px"};e.onMouseClick=function(e){this.display.style.backgroundPosition="0px -"+this.height()*2+"px"};e.disable=function(){this.deactivate();this.display.style.backgroundPosition="0px -"+this.height()*3+"px"};e.disableSelection=function(e){e.style["-moz-user-select"]="-moz-none";e.style["-khtml-user-select"]="none";e.style["-ms-user-select"]="none";e.style["user-selectt"]="none";e.style["-webkit-user-select"]="none"}})();var Sprite=function(){};(function(){var e=Class.extend(Sprite,UIElement);e.isGradient=false;e.htcURL="lib/com/fahimchowdhury/PIE.htc";e.lineStyle=function(e,t){var n=e!=undefined?e:1;var r=t!=undefined?t:"#000";this.display.style.border="solid "+n+"px "+r;delete n;delete r};e.beginGradientFill=function(e,t,n){this.isGradient=true;this.display.style.background=t[0];this.display.style.background="-webkit-gradient(linear, left top, left bottom, from("+t[0]+"), to("+t[1]+"))";this.display.style.background="-moz-linear-gradient(top,  "+t[0]+",  "+t[0]+")";this.display.style["filter"]="progid:DXImageTransform.Microsoft.gradient(startColorstr='"+t[0]+"', endColorstr='"+t[1]+"',GradientType=0);"};e.drawRect=function(e,t,n,r,i,s){this.x(e);this.y(t);this.width(n);this.height(r);this.setColor(i)};e.drawRoundRect=function(e,t,n,r,i,s){this.x(e);this.y(t);this.width(n);this.height(r);this.setColor(s);this.setCorners(i)};e.drawCircle=function(e,t,n,r){this.x(e);this.y(t);this.width(n*2);this.height(n*2);this.setColor(r);this.setCorners(n)};e.setColor=function(e){if(e&&!this.isGradient)this.display.style.backgroundColor=e};e.setCorners=function(e){this.display.style.behavior="url("+this.htcURL+")";this.display.style.webkitBorderRadius=e+"px";this.display.style.MozBorderRadius=e+"px";this.display.style["-moz-border-radius"]=e+"px";this.display.style.borderRadius=e+"px";this.display.style["border-radius"]=e+"px "+e+"px "+e+"px "+e+"px"}})();var MovieClip=function(){};(function(){var e=Class.extend(MovieClip,UIElement);window.frameRate=50;window.frameCount=0;window.clips=[];e.frameRate=100;e.timer=null;e.TO=0;e.FROM=0;e.BG_SIZE="bg_size";e.LOOP=false;e.img=null;e.cFrame=0;e.attach=function(e){this.img=e;this.img.style.position="absolute";this.display.style.overflow="hidden";this.addChild(e)};e.stop=function(){for(var e=0;e<window.clips.length;e++){if(window.clips[e]==this){this.resetMC();window.clips.splice(e,1);if(window.clips.length==0){clearInterval(window.enterFrameTimer);window.enterFrameTimer=null}return}}};e.currentFrame=function(){return Math.round(this.width()/this.getPos().left)};e.resetMC=function(){this.TO=0;this.FROM=0;this.LOOP=false};e.gotoAndStop=function(e){this.stop();e=e?e:0;this.resetMC();this.setFrame(e)};e.gotoAndPlay=function(e,t,n){this.stop();this.TO=t;this.FROM=e;this.LOOP=n?n:false;this.setFrame(e);window.clips.push(this);var r=this;if(!window.enterFrameTimer){window.enterFrameTimer=setInterval(window.onEnterFrame,window.frameRate)}};window.onEnterFrame=function(){for(var e=0;e<window.clips.length;e++){var t=window.clips[e];var n=Math.round(window.frameCount*window.frameRate)%t.frameRate/100;if(n==0){var r=t.TO;var i=t.FROM;var s=t.LOOP;var o=t.cFrame;o++;if(o<=r||String(s)=="true"){t.setFrame(o,String(s)=="true"?i:null,r)}else{window.clips.splice(e,1);t.resetMC();if(window.clips.length==0){clearInterval(window.enterFrameTimer);window.enterFrameTimer=null}}}}window.frameCount++;if(window.frameCount>=1e3){window.frameCount=0}};e.setFrame=function(e,t,n){var r=this.img.width;var i=this.width()*e;if(i>r||t!=null&&n!=null&&n<e){if(t!=null){e=t}else{e=Math.round(r/this.width())}i=this.width()*e}else{}var s=this.getPos().top;this.img.style.top=s+"px";this.img.style.left="-"+i+"px ";this.cFrame=e};e.getPos=function(){var e=this.img.style.top;var t=this.img.style.left;if(e){e=this.replaceSuffix(e)}else{e="0"}if(t){t=this.replaceSuffix(t)}else{t="0"}return{left:t,top:e}};e.replaceSuffix=function(e){e=e.replace("%","");e=e.replace("px","");return e};e.getBGSize=function(){var e=this.getStyle("backgroundImage");e=e.replace("url(","");e=e.replace(")","");e=e.replace('"',"");e=e.replace('"',"");var t=new Image;t.src=e;var n=t.width,r=t.height;t=null;return{width:n,height:r}};e.topPosition=function(e){if(e==undefined){return this.getPos().top}else{this.img.style.top=e+"px"}};e.getStyle=function(e){if(this.img.currentStyle)return this.img.currentStyle[e]?this.img.currentStyle[e].replace("px",""):"";else if(document.defaultView&&document.defaultView.getComputedStyle)return document.defaultView.getComputedStyle(this.img,"")[e].replace("px","");else return this.img.style[e].replace("px","")}})();var Engine=function(){this.event={READY:"ENGINE_READY"};this.prop={width:0,height:0,grid:false,cellSize:10,gridCellIndex:0,gridCellId:"cell-",occupiedXY:[],ignoreCells:[],layer:{bgId:"engineBGLayer",character:"engineCharacterLayer",front:"engineFrontLayer"},container:null};this.holder=null;this.container=function(e){if(e==undefined){var t;if(!this.prop.container){t=document.body}else{t=document.getElementById(this.prop.container)}return t}this.prop.container=e};this.showGrid=function(e){if(e==undefined){return this.prop.grid}else{this.prop.grid=e}};this.init=function(){this.createGrid();this.astar.parent=this};this.createGrid=function(){this.holder=new UIElement;this.holder.build();this.holder.width(this.width());this.holder.height(this.height());this.holder.setStyle();var e=parseInt(this.width()/this.cellSize());var t=parseInt(this.height()/this.cellSize());this.astar.rows=t;this.astar.cols=e;var n=0;var r=0;var i=false;var s;while(!i){if(!this.astar.grid[n])this.astar.grid[n]=[];this.astar.setCell(n,r,false);if(this.prop.grid){s=new Sprite;s.build();s.lineStyle();s.drawRect(r*this.cellSize(),n*this.cellSize(),this.cellSize(),this.cellSize(),null);s.setStyle();this.holder.addChild(s);s.arrange();s.display.id=this.prop.gridCellId+r+"_"+n}this.prop.gridCellIndex++;r++;if(r>=e){n++;r=0}if(n>=t){i=true}}this.holder.arrange();this.createLayers();this.container().appendChild(this.holder.display)};this.createLayers=function(){var e=new UIElement;e.build();e.width(this.width());e.height(this.height());e.setStyle();e.arrange();e.display.id=this.prop.layer.bgId;this.holder.addChild(e);e=new UIElement;e.build();e.width(this.width());e.height(this.height());e.setStyle();e.arrange();e.display.id=this.prop.layer.character;this.holder.addChild(e);e=new UIElement;e.build();e.width(this.width());e.height(this.height());e.setStyle();e.arrange();e.display.id=this.prop.layer.front;this.holder.addChild(e)};this.addToBackgroundLayer=function(e){var t=document.getElementById(this.prop.layer.bgId);if(e.display){t.appendChild(e.display)}else{t.appendChild(e)}};this.addToCharacterLayer=function(e){var t=document.getElementById(this.prop.layer.character);if(e.display){t.appendChild(e.display)}else{t.appendChild(e)}};this.addToFrontLayer=function(e){var t=document.getElementById(this.prop.layer.front);if(e.display){t.appendChild(e.display)}else{t.appendChild(e)}};this.removeFromBackgroundLayer=function(e){var t=document.getElementById(this.prop.layer.bgId);if(e.display){t.removeChild(e.display)}else{t.removeChild(e)}};this.removeFromCharacterLayer=function(e){var t=document.getElementById(this.prop.layer.character);if(e.display){t.removeChild(e.display)}else{t.removeChild(e)}};this.removeFromFrontLayer=function(e){var t=document.getElementById(this.prop.layer.front);if(e.display){t.removeChild(e.display)}else{t.removeChild(e)}};this.setCell=function(e,t,n){var r=this.prop.gridCellId+e+"_"+t;var i=document.getElementById(r);if(!i)return;i.style.backgroundColor=n?n:"#f00"};this.ignoreBlocks=function(e,t){var n=this.getXCell(t==undefined?e.x():e);var r=this.getYCell(t==undefined?e.y():t);var i=this.getXCell(t==undefined?Int(e.x())+Int(e.width()):e);var s=this.getYCell(t==undefined?Int(e.y())+Int(e.height()):t);var o=false;var u=n;while(!o){this.setIgnoreXY(u,r);u++;if(u>=i){u=n;r++}if(r>=s)o=true}};this.addObstacle=function(e,t){var n=this.getXCell(t==undefined?e.x():e);var r=this.getYCell(t==undefined?e.y():t);var i=this.getXCell(t==undefined?Int(e.x())+Int(e.width()):e);var s=this.getYCell(t==undefined?Int(e.y())+Int(e.height()):t);var o=n;var u=r;while(o<i){while(u<s){this.setOccupiedXY(o,u);this.astar.setCell(u,o,true);u++}u=r;o++}delete o;delete u;delete n;delete r;delete i;delete s};this.setOccupiedXY=function(e,t){if(!this.prop.occupiedXY[e])this.prop.occupiedXY[e]=[];this.prop.occupiedXY[e][t]=e+","+t};this.setIgnoreXY=function(e,t){if(!this.prop.ignoreCells[e])this.prop.ignoreCells[e]=[];this.prop.ignoreCells[e][t]=e+","+t};this.getOccupiedXY=function(e,t){var n;var r;if(e.x){n=this.getXCell(e.x());r=this.getYCell(e.y());var i=this.getXCell(Int(e.x())+Int(e.width()));var s=this.getYCell(Int(e.y())+Int(e.height()));var o=n;var u=false;var a=false;while(!a){if(this.prop.occupiedXY[o]&&this.prop.occupiedXY[o][r])u=true;o++;if(o>=i){o=n;r++}if(r>s)a=true}if(u)return true}else{n=this.getXCell(e);r=this.getYCell(t);if(this.prop.occupiedXY[n]&&this.prop.occupiedXY[n][r])return true}return false};this.findPathTo=function(e,t,n){var r=this.getXCell(e.x());var i=this.getYCell(e.y());var s=this.getXCell(t);var o=this.getYCell(n);this.setCell(r,i,"purple");this.setCell(s,o,"yellow");return this.astar.search(r,i,s,o)};this.drawPath=function(e){if(!this.prop.grid)return;for(var t=0;t<e.length;t++){this.setCell(e[t][0],e[t][0],"#00f")}};this.getXCell=function(e){return Math.floor(e/this.cellSize())};this.getYCell=function(e){return Math.floor(e/this.cellSize())};this.cellSize=function(e){if(e==undefined){return this.prop.cellSize}else{this.prop.cellSize=e}};this.width=function(e){if(e==undefined){return this.prop.width}else{this.prop.width=e}};this.height=function(e){if(e==undefined){return this.prop.height}else{this.prop.height=e}};this.astar={grid:[],opened:[],start:null,target:null,parent:null,last:null,rows:0,cols:0,pos:function(e,t){this.x=e;this.y=t;this.cost=0;this.totalcost=0;this.blocked=false;this.closed=false;this.prev=null;this.str=function(){return this.x+","+this.y};this.equal=function(e){return this.x==e.x&&this.y==e.y}},opencell:function(e,t,n){if(!e||e.blocked)return null;if(n&&n.prev&&!n.equal(this.start)){if(e.x-n.x!=n.x-n.prev.x||e.y-n.y!=n.y-n.prev.y)t+=4}var r=parseFloat(t)+14*(Math.abs(e.x-this.target.x)+Math.abs(e.y-this.target.y));if(e.totalcost!=0){if(r<e.totalcost){var i;for(i=0;i<this.opened.length;++i){if(e.equal(this.opened[i])){this.opened.splice(i,1);break}}}else return null}e.cost=t;e.prev=n;e.totalcost=r;var s=0;for(s=0;s<this.opened.length;++s){if(e.totalcost<this.opened[s].totalcost){this.opened.splice(s,0,e);break}}if(s>=this.opened.length)this.opened[s]=e;if(!this.grid[e.y])return null;this.grid[e.y][e.x]=e;this.last=e;return e},openadjacent:function(e){var t=this.grid[e.y][e.x].cost+10;if(e.x>0)this.opencell(this.grid[e.y][e.x-1],t,e);if(e.y>0)this.opencell(this.grid[e.y-1][e.x],t,e);if(e.y<this.rows-1)this.opencell(this.grid[e.y- -1][e.x],t,e);if(e.x<this.cols-1)this.opencell(this.grid[e.y][e.x- -1],t,e)},search:function(e,t,n,r){var i;var s=0;this.setstart(new this.pos(e,t));this.settarget(new this.pos(n,r));i=this.opencell(this.start,0,this.start);while(i&&!i.equal(this.target)){i.closed=true;this.opened.shift();this.openadjacent(i);if(this.opened.length>0)i=this.opened[0];else i=null;if(++s>1e4){i=null;break}}if(!i){return}var o=[];while(!i.equal(this.start)){o.push({x:i.x*this.parent.cellSize(),y:i.y*this.parent.cellSize()});this.parent.setCell(i.x,i.y,"#00f");i=i.prev;if(!i){break}}if(o)o.reverse();return o},setCell:function(e,t,n){if(!this.grid[e])return;this.grid[e][t]={};this.grid[e][t].cost=0;this.grid[e][t].totalcost=0;this.grid[e][t].prev=null;this.grid[e][t].closed=false;this.grid[e][t].blocked=n?true:false;this.grid[e][t].x=t;this.grid[e][t].y=e;this.grid[e][t].str=function(){return this.x+","+this.y};this.grid[e][t].equal=function(e){return this.x==e.x&&this.y==e.y};if(n)this.parent.setCell(t,e,"#f00")},setblock:function(e,t,n,r){for(var i=e.y;i<=t.y;++i){for(var s=e.x;s<=t.x;++s){if(!r.grid[i]||!r.grid[i][s])return;if(n){r.parent.setCell(s,i,"#f00");r.grid[i][s].blocked=true}else{r.parent.setCell(s,i);r.grid[i][s].blocked=false}}}},wipe:function(){var e,t;if(!this.parent||!this.start)return;this.opened=[];for(e=0;e<this.rows;++e){for(t=0;t<this.cols;++t){this.grid[e][t].cost=0;this.grid[e][t].totalcost=0;this.grid[e][t].prev=null;this.grid[e][t].closed=false;if(this.grid[e][t].blocked)this.parent.setCell(t,e,"#f00");else this.parent.setCell(t,e,"#fff")}}this.parent.setCell(this.start.x,this.start.y,"none");this.parent.setCell(this.target.x,this.target.y,"none")},setstart:function(e){if(this.start){this.parent.setCell(e.x,e.y,"yellow")}this.start=e;this.parent.setCell(e.x,e.y,"purple")},settarget:function(e){if(this.target){this.parent.setCell(e.x,e.y,"yellow")}this.target=e;this.parent.setCell(e.x,e.y,"yellow")}}};var IIterator={reset:function(){},next:function(){},hasNext:function(){},index:function(){},purge:function(){},length:function(){}};var ArrayIterator=function(e){this._index=0;this._collection=e;this.reset=function(){this._index=0};this.next=function(){return this._collection[this._index++]};this.hasNext=function(){return this._index<this._collection.length};this.length=function(){return this._collection.length};this.index=function(){return this._index};this.purge=function(){delete this._collection}};Class.implement(ArrayIterator,IIterator);var Collection=function(e){this._collection=e?e:[];this.reverse=function(){this._collection=this._collection.reverse()};this.iterator=function(){return new ArrayIterator(this._collection)};this.find=function(e,t){var n=this.iterator();var r;if(e==""&&!t&&n.hasNext()){r=n.next()}if(r){n.purge();n=null;return r}while(n.hasNext()){r=n.next();if(r.hasOwnProperty(e)&&r[e]==t)return r;if((e||t)&&(r==e||r==t))return r}n.purge();n=null;return null};this.addItem=function(e){this._collection.push(e)};this.addItemAt=function(e,t){this._collection.splice(t,0,e)};this.getItemAt=function(e){return this._collection[e]};this.removeItem=function(e,t){var n=-1;var r=this.iterator();while(r.hasNext()){var i=r.next();if(i.hasOwnProperty(e)&&i[e]==t){n=r.index()-1;break}}r.purge();r=null;return this._collection.splice(n,1)};this.removeItemAt=function(e){this._collection.splice(e,1)};this.length=function(){return this._collection?this._collection.length:0};this.purge=function(){if(!this._collection)return;while(this._collection.length>0){this.removeItemAt(this._collection.length-1)}}};var ContextMenu=function(){};(function(){var e=Class.extend(ContextMenu,UIElement);e.state="hidden";e.f12State="enabled";e.customItems=[];e.build=function(){Class._super(this,"build");this.width(170);this.height(18);Utensil.addListener(document,"contextmenu",this.createHandler(this,"onRightClick"));this.layout(new VerticalLayout);this.layout().verticalGap=5;this.layout(new PaddedLayout);this.layout().top=10;this.layout().bottom=0;this.addItems();this.setStyle()};e.addItems=function(){for(var e=0;e<this.customItems.length;e++){if(this.customItems[e].separatorBefore)this.customItems[e].display.style.borderTop="1px solid #e9e9e9";if(this.customItems[e].separatorAfter)this.customItems[e].display.style.borderBottom="1px solid #e9e9e9";this.addChild(this.customItems[e])}};e.onRightClick=function(e){if(this.state!="showing"){document.body.appendChild(this.display);this.x(Utensil.mouseX(document.body,e));this.y(Utensil.mouseY(document.body,e));this.arrange();this.state="showing";Utensil.addListener(document,"click",this.createHandler(this,"onDOMClick"))}if(e.preventDefault){e.preventDefault()}else{e.returnValue=false}if(e.stopPropagation){e.stopPropagation()}else{e.cancelBubble=true}return false};e.onDOMClick=function(e){document.body.removeChild(this.display);this.state="hidden";Utensil.removeListener(document,"click",this.handlers["onDOMClick"]);this.removeHandler(this,"onDOMClick")};e.setStyle=function(){Class._super(this,"setStyle");this.display.style.backgroundColor="#fff";this.display.style.border="1px solid #bababa";this.display.style["-moz-box-shadow"]="5px 5px 5px rgba(68,68,68,0.6)";this.display.style["-webkit-box-shadow"]="5px 5px 5px rgba(68,68,68,0.6)";this.display.style["box-shadow"]="5px 5px 5px rgba(68,68,68,0.6)"};e.disableF12=function(e){if(!e)return this.f12State;this.f12State=e;if(this.f12State){Utensil.addListener(document,"keydown",this.onF12KeyPress)}else{Utensil.removeListener(document,"keydown",this.onF12KeyPress)}};e.onF12KeyPress=function(e){e=e||window.event;if(e.keyCode==123){if(e.preventDefault){e.preventDefault()}else{e.returnValue=false}if(e.stopPropagation){e.stopPropagation()}else{e.cancelBubble=true}return false}};e.arrange=function(){this.height(this.customItems.length*25+this.layout().top+this.layout().bottom);Class._super(this,"arrange")}})();var ContextMenuItem=function(e,t){this.itemName=e;this.itemCallback=t;this.build();this.setStyle();this.arrange();return this};(function(){var e=Class.extend(ContextMenuItem,Label);e.separatorBefore=false;e.separatorAfter=false;e.build=function(){Class._super(this,"build");this.text(this.itemName);if(this.itemCallback){Utensil.addListener(this.display,"click",this.itemCallback);Utensil.addListener(this.display,"mouseover",this.createHandler(this,"mouseOver"));Utensil.addListener(this.display,"mouseout",this.createHandler(this,"mouseOut"));this.display.style.cursor="pointer"}};e.mouseOver=function(e){this.display.style.backgroundColor="#efefef"};e.mouseOut=function(e){this.display.style.backgroundColor="transparent"};e.setStyle=function(){this.display.style.fontFamily="Arial, Helvetica, sans-serif";this.display.style.fontSize="11px";this.display.style.textAlign="center";this.display.style.paddingTop="2px";this.width(170);this.height(15)}})();var IModel={set:function(e,t){},get:function(e){},remove:function(e){}};var Model=function(e){this.set=function(e,t){this[e]=t};this.get=function(e){if(this[e]!=undefined){return this[e]}return null};this.remove=function(e){if(this[e])delete this[e]};this.init=function(e){if(e){for(var t in e){this.set(t,e[t])}}};if(e)this.init(e)};Class.implement(Model,IModel);var ViewModel=function(e){this.TYPE_ID="ViewModel_TYPE_ID";this.type=this.TYPE_ID;this.set=function(e,t){Class._super(this,"set",e,t);if(document.getElementById(e)&&this.type==this.TYPE_ID){document.getElementById(e).innerHTML=t}};Class._super(this,"init",e)};Class.extend(ViewModel,Model);var StyleSheet={props:{defaultFontSize:null,defaultStageWidth:null,defaultStageHeight:null},getFontSize:function(e){var t=this.getStyle(e,"font-size");if(t.indexOf("em")>-1){var n=this.getStyle(document.body,"font-size");if(n.indexOf("pt")>-1){n=Math.round(parseInt(n)*96/72)}else{n=parseInt(n)}t=Math.round(n*parseFloat(t))}else if(t.indexOf("pt")>-1){t=Math.round(parseInt(t)*96/72)}return parseInt(t)},getStyle:function(e,t){var n=false;if(e.currentStyle){var r=t.split("-");var s=new String("");for(i in r){s+=i>0?r[i].substr(0,1).toUpperCase()+r[i].substr(1):r[i]}n=e.currentStyle[s]}else if(window.getComputedStyle){n=window.getComputedStyle(e,null).getPropertyValue(t)}return n},autoSizeFont:function(e){if(e){Utensil.addListener(window,"resize",StyleSheet.resizeFont);StyleSheet.resizeFont()}else{Utensil.removeListener(window,"resize",StyleSheet.resizeFont)}},resizeRatio:function(){if(!StyleSheet.props.defaultStageWidth){StyleSheet.props.defaultStageWidth=Utensil.stageWidth();StyleSheet.props.defaultStageHeight=Utensil.stageHeight()}var e=Utensil.stageWidth()/StyleSheet.props.defaultStageWidth;var t=Utensil.stageHeight()/StyleSheet.props.defaultStageHeight;if(t<e)e=t;e=e.toFixed(2);if(e>1)e=1;return e},resizeFont:function(){if(!StyleSheet.props.defaultFontSize){StyleSheet.props.defaultFontSize=StyleSheet.getFontSize(Utensil.stage(),"font-size");StyleSheet.props.defaultStageWidth=Utensil.stageWidth();StyleSheet.props.defaultStageHeight=Utensil.stageHeight()}var e=StyleSheet.resizeRatio();var t=10/StyleSheet.props.defaultFontSize*100*e;t=t.toFixed(2);Utensil.stage().style.fontSize=Math.round(t)+"%"}};
(function(window) {
	//apply localstorage
		if(!window.localStorage)window.localStorage =  null;
	//apply JSON.stringify	
		if(!window.JSON)window.JSON =  {};
	JSON.stringify = JSON.stringify || function(obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string")
				obj = '"' + obj + '"';
			return String(obj);
		} else {
			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n];
				t = typeof (v);
				if (t == "string")
					v = '"' + v + '"';
				else if (t == "object" && v !== null)
					v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	// implement JSON.parse de-serialization
	JSON.parse = JSON.parse || function(str) {
		if (str === "")
			str = '""';
		eval("var p=" + str + ";");
		return p;
	};

	window.removeProperty = function(obj, a) {
		if (obj.style.removeProperty) {
			obj.style.removeProperty(a);
		} else {
			obj.removeAttribute(a);
		}
	}
})(window);
var Parallax = {
	scrollSpeed : 0.5,
	id : {
		parallaxHolder : "parallaxHolder"
	},
	children : [],
	movers : [],
	events : [],
	eventNames : {
		viewIn : "VIEW_IN",
		viewOut : "VIEW_OUT",
		onChange : "ON_CHANGE"
	},
	previousTop : 0,
	previousIndex : 0,
	holder : null,
	currentIndex : 0,
	suffixs : {
		opacity : ""
	},
	init : function() {

		this.holder = document.getElementById(this.id.parallaxHolder)
		if (this.holder) {

			this.setChildren(true);
			this.setHolder();
			var root = this;
			Utensil.addListener(window, "resize", function() {
				root.resize();
			});
			Utensil.addListener(window, "scroll", function() {
				root.onScroll();
			});
			this.resize();
		}
	},
	addListener : function(id, eventName, callback) {
		if (!this.events[eventName])
			this.events[eventName] = [];
		if (!this.events[eventName][id])
			this.events[eventName][id] = [];
		var has = false;
		for (var a = 0; a < this.events[eventName][id].length; a++) {
			if (this.events[eventName][id][a] == callback)
				has = true;
		}
		if (!has)
			this.events[eventName][id].push(callback);
	},
	removeListener : function(id, eventName, callback) {
		if (!this.events[eventName] && this.events[eventName][id])
			for (var a = 0; a < this.events[eventName][id].length; a++) {
				if (this.events[eventName][id][a] == callback) {
					this.events[eventName][id].splice(a, 1);
					a = this.events[eventName][id].length + 1;
					return;
				}
			}
	},
	setStartPoint : function(holderId, id, css) {
		if (document.getElementById(id)) {
			if (!this.movers[id])
				this.movers[id] = {
					elem : id,
					holder : holderId
				};
			document.getElementById(id).setAttribute("startpoints", JSON.stringify(css));
			var endPoints = {};
			for (var name in css) {
				var nameStr = name.replace(/([a-z][A-Z])/g, function(g) {
					return g[0] + '-' + g[1].toLowerCase()
				});
				var value = this.getStyle(document.getElementById(id), nameStr);
				if (value != undefined) {

					endPoints[name] = {
						val : value,
						direction : Number(css[name]) <= Number(value) ? 1 : -1,
						suffix : this.attSuffix(name)
					};
				}
			}
			document.getElementById(id).setAttribute("endpoints", JSON.stringify(endPoints));
		}
	},
	attSuffix : function(name) {
		if (this.suffixs[name] != undefined)
			return this.suffixs[name];
		return "px";
	},
	setChildren : function(add) {
		for (var a = 0; a < this.holder.childNodes.length; a++) {
			var child = this.holder.childNodes[a];
			if (child.tagName && child.tagName == "DIV") {
				child.style.width = "100%";
				child.style.position = "relative";
				child.style.overflow = "hidden";
				child.style.height = Utensil.stageHeight() + "px";
				if (add)
					this.children.push(child);
			}
		}
	},
	setHolder : function() {
		this.holder.style.width = "100%";

	},
	getScrollTop : function() {
		var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		return top;
	},
	checkChildOnScreen : function() {

		var childId;
		var dir = "down";

		var ratio = this.getScrollTop() / Utensil.stageHeight();
		var arr = String(ratio.toFixed(2)).split(".");
		var nextIndex = this.currentIndex;
		var percentage = arr[1];

		//work out the index

		//check direction

		if (this.getScrollTop() <= this.previousTop)
			dir = "up";
		this.previousIndex = this.currentIndex;

		this.calculateMoveOut(dir);

		if (Number(arr[0]) != this.previousIndex) {
			this.excuteCallbacks(this.id.parallaxHolder, this.eventNames.onChange, Number(arr[0]));
			if (percentage == 0)
				percentage = 100;
		}

		//var per = Number(arr[1] ? arr[1] : 0);
		//call callbacks for moving element out
		if (this.getScrollTop() > this.previousTop) {
			nextIndex = this.currentIndex + 1;

		} else {
			nextIndex = this.currentIndex - 1;

		}
		this.previousTop = this.getScrollTop();
		if (nextIndex < 0)
			nextIndex = 0;
		if (this.children[nextIndex] && this.children[nextIndex].id) {
			childId = this.children[nextIndex].id;
			this.excuteCallbacks(childId, this.eventNames.viewIn, percentage);

			this.moveIn(childId, percentage, dir);
		}

	},
	calculateMoveOut : function(dir) {
		var ratio = this.getScrollTop() / Utensil.stageHeight();
		var arr = String(ratio.toFixed(2)).split(".");
		var percentage = arr[1];
		var index = Number(arr[0]);
		ratio = 1 - Number("." + index);

		if (this.getScrollTop() > this.previousTop) {
			this.currentIndex = index;

		} else {
			this.currentIndex = index + 1;
			if (this.children.length - 1 <= this.currentIndex)
				this.currentIndex = this.children.length - 1;
		}

		if (this.children[this.currentIndex] && this.children[this.currentIndex].id) {
			childId = this.children[this.currentIndex].id;
			var per = dir == "up" ? percentage : 100 - percentage;
			if (per <= 0)
				per = 100;

			this.excuteCallbacks(childId, this.eventNames.viewOut, per);
			this.moveOut(childId, per, dir);
		}
	},
	moveOut : function(holderId, percent, dir) {
		for (var name in this.movers) {
			var obj = this.movers[name];
			if (obj.holder == holderId) {
				var elem = document.getElementById(this.movers[name].elem);
				var endPoints = JSON.parse(elem.getAttribute("endpoints"));
				var startPoints = JSON.parse(elem.getAttribute("startpoints"));
				var css = [];
				for (var att in endPoints) {
					var endval = Number(endPoints[att].val ? this.getValue(att, endPoints[att].val) : 0);
					var startval = Number(startPoints[att] ? this.getValue(att, startPoints[att]) : 0);
					var direction = startPoints[att].direction;
					var diff = (endval - startval);
					var moveVal = (diff * (percent / 100));

					var finalVal = (startval + moveVal) + endPoints[att].suffix;
					if (!isNaN(moveVal) && !isNaN(diff)) {
						if (dir == "down") {
							elem.style[att] = endval + "px";

						} else {
							if (!window.TweenLite) {
								elem.style[att] = finalVal;
							} else {
								css[att] = finalVal;
							}
						}
					}

				}
				if (window.TweenLite) {

					TweenLite.killTweensOf(elem);
					TweenLite.to(elem, 0.2 * (percent / 100), {
						css : css
					});
				}

			}
		}
	},
	getValue : function(att, val) {

		if (val.indexOf("%") >= 0) {
			val = Number(val.replace("%", ""));
			if (att == "left" || att == "width" || att == "right") {

				val = Utensil.stageWidth() * (val / 100);
			} else {
				val = Utensil.stageHeight() * (val / 100);

			}
		}
		val = String(val).replace("px", "");
		return val;
	},
	moveIn : function(holderId, percent, dir) {
		for (var name in this.movers) {
			var obj = this.movers[name];
			if (obj.holder == holderId) {
				var elem = document.getElementById(this.movers[name].elem);
				var endPoints = JSON.parse(elem.getAttribute("endpoints"));
				var startPoints = JSON.parse(elem.getAttribute("startpoints"));
				var css = [];
				for (var att in endPoints) {
					var endval = Number(endPoints[att].val ? this.getValue(att, endPoints[att].val) : 0);
					var startval = Number(startPoints[att] ? this.getValue(att, startPoints[att]) : 0);
					var direction = startPoints[att].direction;
					var diff = endval - startval;
					var moveVal = (diff * (percent / 100));
					
					if (!isNaN(moveVal) && !isNaN(diff)) {
						var finalVal = (startval + moveVal) + endPoints[att].suffix;

						if (dir != "up") {
							if (!window.TweenLite) {
								elem.style[att] = finalVal;
							} else {
								css[att] = finalVal;
							}
						}
					}

				}

				if (window.TweenLite) {

					TweenLite.killTweensOf(elem);
					TweenLite.to(elem, 0.2 * (percent / 100), {
						css : css
					});
				}

			}
		}
	},
	excuteCallbacks : function(id, eventName, percent) {
		if (this.events[eventName] && this.events[eventName][id]) {
			for (var a = 0; a < this.events[eventName][id].length; a++) {
				this.events[eventName][id][a](percent);
			}
		}
	},
	navigateTo : function(index) {

		this.currentIndex = index;
		this.excuteCallbacks(this.id.parallaxHolder, this.eventNames.onChange, this.currentIndex);
		if (!window.TweenLite) {
			window.scrollTo(0, (Utensil.stageHeight() * index));
		} else {
			TweenLite.to(window, this.scrollSpeed, {
				scrollTo : {
					y : (Utensil.stageHeight() * index)
				},
				onComplete : function() {
					this.scrollDir = null
				},
				onCompleteScope : this
			});
		}
		//this.scrollDir=null;
	},
	onScroll : function() {

		this.checkChildOnScreen();
	},
	resize : function() {
		this.setChildren();

		this.navigateTo(this.currentIndex);
	},
	getStyle : function(oElm, strCssRule) {
		var strValue = "";
		if (document.defaultView && document.defaultView.getComputedStyle) {
			strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		} else if (oElm.currentStyle) {
			strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	}
};
