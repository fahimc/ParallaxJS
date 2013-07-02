(function(window) {
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	};

	function onLoad() {
		Parallax.init();
		Parallax.addListener("view1","VIEW_OUT",view1Scroll);
		Parallax.addListener("view2","VIEW_IN",view2Scroll);
		Parallax.addListener("parallaxHolder","ON_CHANGE",onChange);
		
		Parallax.setStartPoint("view2","slideIn",{left:"-300px"})
		Parallax.setStartPoint("view2","slideBack",{left:"100%",fontSize:"10px",top:"50%",opacity:"0px"})
		Parallax.setStartPoint("view3","girl",{left:"60%"})
		
		
		document.getElementById("parallaxHolder").style.visibility="visible";
		
		
	};
	function view1Scroll(percent)
	{
		//console.log("view 1",percent);
	};
	function view2Scroll(percent)
	{
		//console.log("view 2",percent);
		
	};
	function onChange(index)
	{
		var nav=document.getElementById("nav");
		var currentIndex=0;
		for(var a=0;a<nav.childNodes.length;a++)
		{
			var child=nav.childNodes[a];
			if(child.className && child.className.indexOf("navButton")>=0)
			{
				if(child.className.indexOf("selected")>=0)child.className=child.className.replace(" selected","");
				if(currentIndex == index)child.className+=" selected";
				
				currentIndex++;
			}
		}
		
	};
	Main();
}
)(window); 