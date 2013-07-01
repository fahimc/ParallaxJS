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
