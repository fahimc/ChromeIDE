var Navigator = (function() {

	function Navigator() {
		this._construct();
	};

	_Class.extend(Navigator, UIElement, {
		
		build : function() {
			this.canvas = null;
			this.getElement().classList.add('navigator');
		},
		update : function(node) {
			
		}
	});

	return Navigator;
})();
