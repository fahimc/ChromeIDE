app.module.TabContainer = (function() {

	function TabContainer() {
		this._construct();
	};

	_Class.extend(TabContainer, UIElement, {
		build : function() {
			this.getElement().classList.add('tabsHolder');

			this.setListeners();
		},
		setListeners : function() {
			this.getElement().addEventListener('drop', this.onDrop.bind(this));
			this.getElement().addEventListener('dragover', this.onDragOver.bind(this));
		},
		onDrop : function(event) {
			event.preventDefault();
			var data = event.dataTransfer.getData('text/plain');

			EventManager.dispatchEvent(Tab.events.DROP_ON_CONTAINER, {
				container : this,
				transfer : EventManager.data.transfer
			});
		},
		onDragOver : function(event) {
			event.preventDefault();
		}
	});

	return TabContainer;
})();
