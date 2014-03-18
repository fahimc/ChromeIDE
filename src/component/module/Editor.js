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
      _Class._super(this,"_construct");
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
    purge:function(){
    	
    }
  });

  return Editor;
})();
