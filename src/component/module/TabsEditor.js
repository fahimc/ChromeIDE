app.module.TabsEditor = (function() {

	function TabsEditor() {
		this.editor = null;
	};

	_Class.extend(TabsEditor, UIElement, {
		_index :0,
		_tabHolder :null,
		_editorHolder :null,
		_currentEditor :null,
		_currentTab :null,
		_editorCollection:[],
		_tabCollection : [],
		_editor : null,
		build : function() {
			
			this._tabHolder=document.createElement('DIV');
			this._tabHolder.classList.add('tabsHolder');
			this.getElement().appendChild(this._tabHolder);
			
			this._editorHolder=document.createElement('DIV');
			this._editorHolder.classList.add('editorHolder');
			this.getElement().appendChild(this._editorHolder);
			
			this.getElement().classList.add('module');
			
			this.add("tab 1");
			this.add("tab 2");
			
		},
		add:function(src){
			this._index++;
			var _tab =new Tab(src,this._index);
			_tab.addEventListener(Tab.events.SELECTED,this.onTabClicked.bind(this));
			_tab.build();
			this._tabHolder.appendChild(_tab.getElement());
			this._tabCollection.push(_tab);
			
			var _editor = new app.module.Editor();
			_editor.id=this._index;
			_editor.build();
			this._editorCollection.push(_editor);
			this.switchEditor(_editor);
		},
		getEditor:function(id)
		{
			for(var a=0;a<this._editorCollection.length;a++){
				if(this._editorCollection[a].id==id)return this._editorCollection[a];
			}
			return null;
		},
		getTab:function(id)
		{
			for(var a=0;a<this._tabCollection.length;a++){
				if(this._tabCollection[a].id==id)return this._tabCollection[a];
			}
			return null;
		},
		switchEditor:function(editor){
			if(this._currentEditor)
			this._editorHolder.removeChild(this._currentEditor.getElement());
			this._editorHolder.appendChild(editor.getElement());
			this._currentEditor= editor;
			if(this._currentTab)this._currentTab.getElement().classList.remove('active');
			this._currentTab=this.getTab(editor.id);
			this._currentTab.getElement().classList.add('active');
		},
		arrange:function(){
			if(this._editor)this._editor.arrange();
		},
		onTabClicked:function(event){
			var editor = this.getEditor(event.id);
			
			
			this.switchEditor(editor);
			
		}
	});

	return TabsEditor;
})();
