chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create("window.html", {
		frame : "none",
		id : "framelessWinID",
		bounds : {
			width : 700,
			height : 700,
			left : 600
		},
		minWidth : 220,
		minHeight : 220,
		hidden : true
	});
}); 