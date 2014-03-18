var PanelManager = (function() {

	function PanelManager() {
		EventManager.addEventListener(Panel.events.REMOVE,this.onPanelRemove.bind(this));
	}


	PanelManager.prototype = {
		_index:0,
		_panels : [],
		_holderId : "panelHolder",
		create : function(module) {
			var panel = new Panel(module);
			panel.id=this._index++;
			panel.build();
			this._panels.push(panel);
			document.getElementById(this._holderId).appendChild(panel.getElement());

			this.arrange();
		},
		removeByIndex : function(index) {
			this._panels.splice(index, 1);
		},
		removeItemById : function(collection, id) {
			for (var a = 0; a < collection.length; a++) {
				if (collection[a].id == id) {
					var item = collection[a];
					collection.splice(a, 1);
					return item;
				}
			}
			return null;
		},
		arrange : function() {
			for (var a = 0; a < this._panels.length; a++) {
				
				var panel =this._panels[a];
				
				switch(this._panels.length) {
					case 1:
					panel.updateLayout("full");
						break;
					case 2:
					if(a==0)
					{
						panel.updateLayout("left");
					}else{
						panel.updateLayout("right");
					}
						break;
					case 3:

						break;
					case 4:

						break;
				}
			}

		},
		onPanelRemove:function(event){
			
			var panel = this.removeItemById(this._panels,event.panelId);
			document.getElementById(this._holderId).removeChild(panel.getElement());
			panel.purge();
			panel=null;
			
			this.arrange();
		}
	};
	return new PanelManager();
})();
