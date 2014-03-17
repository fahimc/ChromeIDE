var UIElement = (function() {

	function UIElement() {
		this._element = null;
		this.init();
	};

	UIElement.prototype = {
		_element : null,
		init : function() {
			this._element = document.createElement('DIV');
		},
		build:function(){
			
		},
		getElement:function(){
			return this._element;
		},
		arrange:function(){
			
		}
	};

	return UIElement;

})();
