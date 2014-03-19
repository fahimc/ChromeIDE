app.module.Editor = (function() {

	function Editor() {

		this._construct();
	};

	_Class.extend(Editor, UIElement, {
		editor : null,
		id : null,
		_construct : function() {
			this.editor = null;
			this.id = 0;
			this.panelId = null;
			_Class._super(this, "_construct");
		},
		build : function() {

			this.getElement().classList.add('module');
			this.getElement().classList.add('editor');

			this.editor = ace.edit(this.getElement());

			this.editor.setOptions({
				enableBasicAutocompletion : true
			});

			this.editor.setTheme("ace/theme/monokai");
			this.editor.getSession().setMode("ace/mode/javascript");
			this.editor.getSession().setUseWrapMode(true);

			this.setListeners();
		},
		setListeners : function() {
			this.getElement().addEventListener('drop', this.onDrop.bind(this));
			this.getElement().addEventListener('dragover', this.onDragOver.bind(this));
		},
		arrange : function() {

			if (this.editor)
				this.editor.resize();
		},
		changeTheme : function(str) {
			this.editor.setTheme(str);
		},
		changeMode : function(mode) {
			this.editor.getSession().setMode(mode);
		},
		getText : function() {
			return this.editor.getValue();
		},
		setText : function(value) {
			return this.editor.setValue(value);
		},
		purge : function() {

		},
		onDrop : function(event) {
			console.log("editor drop");
			event.preventDefault();
			var data = event.dataTransfer.getData('text/plain');

			EventManager.dispatchEvent(Tab.events.DROP_ON_MODULE, {
				editor : this,
				transfer : EventManager.data.transfer
			});
		},
		onDragOver : function(event) {
			event.preventDefault();
		}
	});

	return Editor;
})();
