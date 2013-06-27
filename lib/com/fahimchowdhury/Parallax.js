var Parallax = {
	scrollSpeed:0.5,
	id : {
		parallaxHolder : "parallaxHolder"
	},
	children : [],
	movers : [],
	events : [],
	eventNames : {
		viewIn : "VIEW_IN",
		viewOut : "VIEW_OUT"
	},
	holder : null,
	currentIndex : 0,
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
				endPoints[name] = this.getStyle(document.getElementById(id),nameStr);
			}
			document.getElementById(id).setAttribute("endpoints", JSON.stringify(endPoints));
		}
	},
	setChildren : function(add) {
		for (var a = 0; a < this.holder.childNodes.length; a++) {
			var child = this.holder.childNodes[a];
			if (child.tagName && child.tagName == "DIV") {
				child.style.width = "100%";
				child.style.position = "relative";
				child.style.height = Utensil.stageHeight() + "px";
				if (add)
					this.children.push(child);
			}
		}
	},
	setHolder : function() {
		this.holder.style.width = "100%";

	},
	checkChildOnScreen : function() {
		var childId;
		var a = 0;
		var ratio = document.body.scrollTop / Utensil.stageHeight();
		var arr = String(ratio.toFixed(2)).split(".");
		var goingOutIndex = Number(arr[0]);
		this.currentIndex = Number(arr[0]) + 1;
		var goingOutPer = 100 - Number(arr[1] ? arr[1] : 0);
		var per = Number(arr[1] ? arr[1] : 0);
		//call callbacks for moving element out
		if (this.children[goingOutIndex] && this.children[goingOutIndex].id) {
			childId = this.children[goingOutIndex].id;
			this.excuteCallbacks(childId, this.eventNames.viewOut, goingOutPer);
			//this.moveChildren(childId, goingOutPer);
		}
		//call callbacks for moving element in
		if (this.children[this.currentIndex] && this.children[this.currentIndex].id) {
			childId = this.children[this.currentIndex].id;
			this.excuteCallbacks(childId, this.eventNames.viewIn, per);
			this.moveChildren(childId, per);
		}

	},
	moveChildren : function(holderId, percent) {
		for (var name in this.movers) {
			var obj = this.movers[name];
			if (obj.holder == holderId) {
				var elem = document.getElementById(this.movers[name].elem);
				var endPoints = JSON.parse(elem.getAttribute("endpoints"));
				var startPoints = JSON.parse(elem.getAttribute("startpoints"));
				var css = [];
				for (var att in endPoints) {
					var endval = Number(endPoints[att]?String(endPoints[att]).replace("px",""):0);
					var startval = Number(startPoints[att]?String(startPoints[att]).replace("px",""):0);
					var diff =  endval-startval;
					var finalVal =startval+(diff * (percent / 100))+ "px";
					if(!window.TweenLite)
					{
						elem.style[att] = finalVal;
					}else{
						css[att]=finalVal;
					}
				}
				if(window.TweenLite)
				{
					
						TweenLite.killTweensOf(elem);
						TweenLite.to(elem,0.2 * (percent / 100),{css:css});
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
	navigateTo:function(id)
	{
		var index=0;
		for(var a=0;a<this.children.length;a++)
		{
			if(this.children[a].id && this.children[a].id==id)
			{
				index=a;
				a=this.children.length;
			}
		}
		if(!window.TweenLite)
		{
			window.scrollTo(0,(Utensil.stageHeight() * index));
		}else
		{
			TweenLite.to(window,this.scrollSpeed,{scrollTo:{y:(Utensil.stageHeight() * index)}});
		}
			
	},
	onScroll : function() {
		this.checkChildOnScreen();
	},
	resize : function() {
		this.setChildren();
	},
	getStyle:function(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}
};
