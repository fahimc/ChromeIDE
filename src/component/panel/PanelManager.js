var PanelManager = (function() {

	function PanelManager() {
		EventManager.addEventListener(Panel.events.REMOVE, 'onPanelRemove', this);
	}


	PanelManager.prototype = {
		_index : 0,
		_panels : [],
		_holderId : "panelHolder",
		create : function(module) {
			if (this._panels.length >= 4)
				return false;
			var panel = new Panel(module);
			panel.id = this._index++;
			panel.build();
			this._panels.push(panel);
			document.getElementById(this._holderId).appendChild(panel.getElement());

			this.arrange();

			return panel;
		},
		getPanelByIndex : function(index) {
			return this._panels[index];
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

				var panel = this._panels[a];

				switch(this._panels.length) {
					case 1:
						panel.updateLayout("full");
						break;
					case 2:
						if (a == 0) {
							panel.updateLayout("left");
						} else {
							panel.updateLayout("right");
						}
						break;
					case 3:
						if (a == 0) {
							panel.updateLayout("left_top");
						} else if (a == 1) {
							panel.updateLayout("right");
						} else {
							panel.updateLayout("left_bottom");
						}
						break;
					case 4:
						if (a == 0) {
							panel.updateLayout("left_top");
						} else if (a == 1) {
							panel.updateLayout("right_top");
						} else if (a == 2) {
							panel.updateLayout("left_bottom");
						} else {
							panel.updateLayout("right_bottom");
						}
						break;
				}
			}

		},
		onPanelRemove : function(event) {

			var panel = this.removeItemById(this._panels, event.panelId);
			document.getElementById(this._holderId).removeChild(panel.getElement());
			panel.purge();
			panel = null;

			this.arrange();
		}
	};
	return new PanelManager();
})();
