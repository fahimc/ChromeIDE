var Tab = (function() {

  function Tab(src, id) {
    this.title = src ;
    this.id = id;
    this._construct();

  };

  Tab.events = {
    SELECTED : "SELECTED",
    CLOSE : "CLOSE"
  };

  _Class.extend(Tab, EventDispatcher);
  _Class.extend(Tab, UIElement, {
    title : null,
    id : null,
    titleSpan : null,
    _construct : function() {

      this.titleSpan = null;
      this.closeButton = null;
     UIElement.prototype._construct.call(this);
     EventDispatcher.prototype._construct.call(this);

    },
    build : function() {

      this.titleSpan = document.createElement("SPAN");
      this.closeButton = document.createElement("DIV");
      this.titleSpan.innerHTML = this.title!=undefined?this.title: "untitled"+this.id;
      this.closeButton.innerHTML = "x";
      
      
      this.getElement().setAttribute('draggable',true);
      
      this.getElement().appendChild(this.titleSpan);
      this.getElement().appendChild(this.closeButton);

      this.getElement().classList.add('tab');
      this.closeButton.classList.add('close');

      this.setListeners();
    },
    setListeners : function() {
      this.getElement().addEventListener('click', this.onClick.bind(this));
      this.getElement().addEventListener('startdrag', this.onDrag.bind(this));
      this.closeButton.addEventListener('click', this.onCloseClick.bind(this));
    },
    onClick : function(event) {
      this.dispatchEvent(Tab.events.SELECTED, {
        id : this.id,
        srcElement : this.getElement()
      });
    },
    onCloseClick:function(event){
    	this.dispatchEvent(Tab.events.CLOSE,{
        id : this.id,
        srcElement : this.getElement()
      });
      
      event.stopPropagation();
    },
    onDrag:function(event){
      event.dataTransfer.setData('text/plain','hello');
    }
  });

  return Tab;
})();
