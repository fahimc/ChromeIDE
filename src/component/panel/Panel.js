var Panel = (function() {

	function Panel(moduleClass) {
		// if(!moduleClass) throw new UserException("Module required");
		this._moduleClass = moduleClass;
		this.module=null;
		this.id=null;
		this._construct();
	};
	
	Panel.events={
		REMOVE:"REMOVE"
	};
	
	_Class.extend(Panel, UIElement, {
		id : null,
		_moduleClass : null,
		_layoutClassName:"",
		module : null,
		_construct : function() {
		   _Class._super(this,"_construct");
			this.setListeners();
		},
		build : function() {
		 
			if(!this._moduleClass)return;
			this.module = new this._moduleClass();
			this.module.panelId=this.id;
			this.module.build();
			
			this.getElement().appendChild(this.module.getElement());
			
			this.getElement().classList.add('panel');
		},
		setListeners : function() {

			window.addEventListener('resize', this.onResize.bind(this));
		},
		updateLayout:function(className){
			if(this._layoutClassName)this.getElement().classList.remove(this._layoutClassName);
			this._layoutClassName= className;
			this.getElement().classList.add(this._layoutClassName);
			
		},
		getElement : function() {
			return this._element;
		},
		onResize : function() {
			if (this.module)
				this.module.arrange();
		},
		onRemove:function(){
			
		}
	});

	return Panel;

})();
