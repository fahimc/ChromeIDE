var Panel = (function() {

	function Panel(moduleClass) {
		// if(!moduleClass) throw new UserException("Module required");
		this._moduleClass = moduleClass;
		this.init();
	};

	_Class.extend(Panel, UIElement, {
		_moduleClass : null,

		module : null,
		init : function() {
			this.setListeners();
		},
		build : function() {
			if(!this._moduleClass)return;
			this.module = new this._moduleClass();
			this.module.build();
			this.getElement().appendChild(this.module.getElement());
			
			this.getElement().classList.add('panel');
		},
		setListeners : function() {

			window.addEventListener('resize', this.onResize.bind(this));
		},
		getElement : function() {
			return this._element;
		},
		onResize : function() {
			if (this.module)
				this.module.arrange();
		}
	});

	return Panel;

})();
