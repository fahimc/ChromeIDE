var Module = (function() {

	function Module() {
		
		this._construct();
	};

	_Class.extend(Module, EventDispatcher);
	_Class.extend(Module, UIElement, {
		_construct:function(){
			this.panelId= null;
			UIElement.prototype._construct.call(this);
			EventDispatcher.prototype._construct.call(this);
		},
		panelId:null
	});

	return Module;

})();
