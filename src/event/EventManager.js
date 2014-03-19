var EventManager = (function() {

	function EventManager() {

	}


	_Class.extend(EventManager, EventDispatcher, {
		data:{
			transfer:null
		}
	});
	return new EventManager();
})();
