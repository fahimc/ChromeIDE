(function() {
	var buttons = [];
	var windowState = "normal";
	var webview;
	function init() {
		window.addEventListener('load', onLoad);
	}

	function onLoad() {
		setListeners();
		build();
	}

	function setListeners() {
		buttons['closeWindow_button'] = document.getElementById('closeWindow_button');
		buttons['minimiseWindow_button'] = document.getElementById('minimiseWindow_button');
		buttons['maximiseWindow_button'] = document.getElementById('maximiseWindow_button');
		// buttons['reloadWebview_button'] = document.getElementById('reloadWebview_button');
		buttons['closeWindow_button'].addEventListener('click', onButtonClick);
		buttons['minimiseWindow_button'].addEventListener('click', onButtonClick);
		buttons['maximiseWindow_button'].addEventListener('click', onButtonClick);
		// buttons['reloadWebview_button'].addEventListener('click', onButtonClick);
		// webview = document.querySelector('webview');
		// webview.addEventListener("contentload", contentload);
	}
	
	function build(){
		var panel1 = window.p =  new Panel(app.module.TabsEditor);
		panel1.build();
		document.body.appendChild(panel1.getElement());
	}
	
	function onButtonClick(event) {
		switch(event.currentTarget.id) {
			case 'closeWindow_button':
				// webview.terminate();
				chrome.app.window.current().close();
				break;
			case 'minimiseWindow_button':
				chrome.app.window.current().minimize();
				break;
			case 'reloadWebview_button':
				// webview.reload();
				break;
			case 'maximiseWindow_button':

				if (chrome.app.window.current().isMaximized()) {

					chrome.app.window.current().restore();
				} else {
					chrome.app.window.current().maximize();

				}
				break;
		}
	}

	init();
})();
