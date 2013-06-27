(function(window) {
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		Parallax.init();
		Parallax.addListener("view1","VIEW_OUT",view1Scroll);
		Parallax.addListener("view2","VIEW_IN",view2Scroll);
		
		Parallax.setStartPoint("view2","whiteBox",{top:50,left:300,width:40,height:50});
		
		Parallax.navigateTo("view3");
	}
	function view1Scroll(percent)
	{
		//console.log("view 1",percent);
	}
	function view2Scroll(percent)
	{
		//console.log("view 2",percent);
		
	}
	Main();
}
)(window); 