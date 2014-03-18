var Tab = (function() {

  function Tab(src, id) {
    this.title = src ? src : "untitled";
    this.id = id;
    this._construct();

  };

  Tab.events = {
    SELECTED : "SELECTED"
  };

  _Class.extend(Tab, EventDispatcher);
  _Class.extend(Tab, UIElement, {
    title : null,
    id : null,
    titleSpan : null,
    _construct : function() {

      this.titleSpan = null;
     UIElement.prototype._construct.call(this);
     EventDispatcher.prototype._construct.call(this);

    },
    build : function() {

      this.titleSpan = document.createElement("SPAN");
      this.titleSpan.innerHTML = this.title;
      this.getElement().appendChild(this.titleSpan);

      this.getElement().classList.add('tab');

      this.setListeners();
    },
    setListeners : function() {
      this.getElement().addEventListener('click', this.onClick.bind(this));
    },
    onClick : function(event) {
      this.dispatchEvent(Tab.events.SELECTED, {
        id : this.id,
        srcElement : this.getElement()
      });
    }
  });

  return Tab;
})();
