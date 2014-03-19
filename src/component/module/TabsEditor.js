app.module.TabsEditor = (function() {

	function TabsEditor() {

		this._construct();

	};
	_Class.extend(TabsEditor, Module, {
		_tabHolder : null,
		_editorHolder : null,
		_currentEditor : null,
		_currentTab : null,
		_editorCollection : [],
		_tabCollection : [],
		_editor : null,
		_construct : function() {

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

			this._tabHolder = new app.module.TabContainer();
			this._tabHolder.build();
			this.getElement().appendChild(this._tabHolder.getElement());

			this._editorHolder = document.createElement('DIV');
			this._editorHolder.classList.add('editorHolder');
			this.getElement().appendChild(this._editorHolder);

			this.getElement().classList.add('module');

			// this.navi = new Navigator();
			// this.navi.build();
			// this.getElement().appendChild(this.navi.getElement());

			//DEBUG
			var rand = Math.floor(Math.random() * 4) + 1;

			for (var a = 0; a < rand; a++) {
				this.add();
			}

			this.setListeners();

		},
		add : function(src) {
			PanelModel.tabIndex++;
			var _tab = new Tab(src, PanelModel.tabIndex);

			_tab.build();

			var _editor = new app.module.Editor();
			_editor.id = PanelModel.tabIndex;
			_editor.build();

			this.addTabAndEditor(_tab, _editor);

			this.switchEditor(_editor);

		},
		addTabAndEditor : function(tab, editor) {
			tab.data = {
				panelId : this.panelId
			};

			tab.addEventListener(Tab.events.SELECTED, 'onTabClicked', this);
			tab.addEventListener(Tab.events.CLOSE, 'onTabCloseClicked', this);
			editor.editor.on('input', this.onEditorKey.bind(this));

			this._tabHolder.getElement().appendChild(tab.getElement());
			this._tabCollection.push(tab);

			editor.panelId = this.panelId;

			this._editorCollection.push(editor);
		},
		setListeners : function() {
			EventManager.addEventListener(Tab.events.DROP_ON_CONTAINER, "onDropTabContainer", this);
			EventManager.addEventListener(Tab.events.DROP_ON_MODULE, "onDropTabModule", this);
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
		getPreviousItemById : function(collection, id) {
			for (var a = 0; a < collection.length; a++) {
				if (collection[a].id == id) {
					var item = collection[a - 1];
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
		addExisting : function(tab, editor) {

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
			this.removeTabAndEditor(tab, editor);
		},
		removeTabAndEditor : function(tab, editor, keep) {
			if (this._currentEditor == editor) {
				this._editorHolder.removeChild(editor.getElement());

				var nextEditor = this.getPreviousItemById(this._editorCollection, editor.id);
				this._currentEditor = null;
				if (nextEditor && nextEditor != editor)
					this.switchEditor(nextEditor);
			}
			this._tabHolder.getElement().removeChild(tab.getElement());

			this.removeTab(tab.id);
			this.removeEditor(editor.id);

			tab.removeEventListener(Tab.events.SELECTED, "onTabClicked", this);
			tab.removeEventListener(Tab.events.CLOSE, "onTabCloseClicked", this);
			editor.editor.removeListener('input', this.onEditorKey.bind(this));

			if (!keep) {
				editor.purge();
				tab.purge();
				editor = null;
				tab = null;
			}
			if (this._tabCollection.length == 0)
				EventManager.dispatchEvent(Panel.events.REMOVE, {
					panelId : this.panelId
				});
		},
		onEditorKey : function() {
			this.navi.update(this._currentEditor);
		},
		onDropTabContainer : function(event) {

			if (this._tabHolder == event.container && !this.getTab(event.transfer.id)) {
				var tab = event.transfer;
				var panelId = tab.data.panelId;
				var panel = PanelManager.getPanelByIndex(panelId);
				var tabEditor = panel.module;
				var editor = tabEditor.getEditor(tab.id);

				tabEditor.removeTabAndEditor(tab, editor, true);

				this.addTabAndEditor(tab, editor);
				this.switchEditor(editor);
			}
		},
		onDropTabModule : function(event) {
			var tab = event.transfer;
			var editor = event.editor;
			var panelId = tab.data.panelId;
			var panel = PanelManager.getPanelByIndex(panelId);
			var tabEditor = panel.module;
			var conEditor = tabEditor.getEditor(tab.id);
	
			if (editor && this.getEditor(editor.id) && this.panelId == editor.panelId) {
	
				var newPanel = PanelManager.create(app.module.TabsEditor);
				if (newPanel) {
					tabEditor.removeTabAndEditor(tab, conEditor, true);
					setTimeout(function() {
						newPanel.module.addTabAndEditor(tab, conEditor);
						newPanel.module.switchEditor(conEditor);
					}, 30);

				}
			}

		}
	});

	return TabsEditor;
})();
