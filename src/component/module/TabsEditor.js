app.module.TabsEditor = (function() {

	function TabsEditor() {

		this._construct();

	};
	_Class.extend(TabsEditor, Module, {
		_index : 0,
		_tabHolder : null,
		_editorHolder : null,
		_currentEditor : null,
		_currentTab : null,
		_editorCollection : [],
		_tabCollection : [],
		_editor : null,
		_construct : function() {
			this._index = 0;
			this._tabHolder = null;
			this._editorHolder = null;
			this._currentEditor = null;
			this._currentTab = null;
			this._editorCollection = [];
			this._tabCollection = [];
			this.editor = null;

			_Class._super(this, "_construct");
		},
		build : function() {

			this._tabHolder = document.createElement('DIV');
			this._tabHolder.classList.add('tabsHolder');
			this.getElement().appendChild(this._tabHolder);

			this._editorHolder = document.createElement('DIV');
			this._editorHolder.classList.add('editorHolder');
			this.getElement().appendChild(this._editorHolder);

			this.getElement().classList.add('module');
			
			this.navi = new Navigator();
			this.navi.build();
			this.getElement().appendChild(this.navi.getElement());
				
			//DEBUG
			var rand = Math.floor(Math.random() * 4) + 1;

			for (var a = 0; a < rand; a++) {
				this.add();
			}

		},
		add : function(src) {
			this._index++;
			var _tab = new Tab(src, this._index);

			_tab.addEventListener(Tab.events.SELECTED, this.onTabClicked.bind(this));
			_tab.addEventListener(Tab.events.CLOSE, this.onTabCloseClicked.bind(this));

			_tab.build();
			this._tabHolder.appendChild(_tab.getElement());
			this._tabCollection.push(_tab);

			var _editor = new app.module.Editor();
			_editor.id = this._index;
			_editor.build();
			_editor.editor.on('input', this.onEditorKey.bind(this));
			this._editorCollection.push(_editor);
			this.switchEditor(_editor);
			
			
		},
		getEditor : function(id) {
			for (var a = 0; a < this._editorCollection.length; a++) {
				if (this._editorCollection[a].id == id)
					return this._editorCollection[a];
			}
			return null;
		},
		removeTab : function(id) {
			return this.removeItemById(this._tabCollection, id);

		},
		removeEditor : function(id) {
			return this.removeItemById(this._editorCollection, id);

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
		getTab : function(id) {
			for (var a = 0; a < this._tabCollection.length; a++) {
				if (this._tabCollection[a].id == id)
					return this._tabCollection[a];
			}
			return null;
		},
		switchEditor : function(editor) {
			if (this._currentEditor)
				this._editorHolder.removeChild(this._currentEditor.getElement());
			this._editorHolder.appendChild(editor.getElement());
			this._currentEditor = editor;
			if (this._currentTab)
				this._currentTab.getElement().classList.remove('active');
			this._currentTab = this.getTab(editor.id);
			this._currentTab.getElement().classList.add('active');
		},
		arrange : function() {
			if (this._editor)
				this._editor.arrange();
		},
		onTabClicked : function(event) {

			var editor = this.getEditor(event.id);

			this.switchEditor(editor);

		},
		onTabCloseClicked : function(event) {
		
			var editor = this.removeEditor(event.id);
			var tab = this.removeTab(event.id);
			if(this._currentEditor==editor)
			this._editorHolder.removeChild(editor.getElement());
			this._tabHolder.removeChild(tab.getElement());
			editor.purge();
			tab.purge();
			editor = null;
			tab = null;
			if (this._tabCollection.length == 0)
				EventManager.dispatchEvent(Panel.events.REMOVE, {
					panelId : this.panelId
				});
		},
		onEditorKey:function(){
			this.navi.update(this._currentEditor);
		}
	});

	return TabsEditor;
})();
