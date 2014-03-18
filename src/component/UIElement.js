var UIElement = (function() {

  function UIElement() {
    this._construct();
  };

  UIElement.prototype = {
    _element : null,
    _construct : function() {
        this._element = document.createElement('DIV');
    },
    build : function() {

    },
    getElement : function() {
      return this._element;
    },
    arrange : function() {

    }
  };

  return UIElement;

})();
