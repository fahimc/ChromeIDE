var EventDispatcher=(function(){
	
	function EventDispatcher(){
		this._construct();
	};
	
	EventDispatcher.prototype=
	{
	  _construct:function(){
	    this._events=[];
	  },
		addEventListener : function(name, callback,scope) {
			if(!this._events[name])this._events[name]=[];
			this._events[name].push({callback:callback,scope:scope});
		},
		removeEventListener : function(name, callback) {
			if(!this._events[name])return;
			for(var a=0;a<this._events[name].length;a++)
			{
			
				if(this._events[name][a].callback==callback)
				{
					this._events[name].splice(a,1);
					return;
				}
			}
			
		},
		dispatchEvent:function(name,args){
			if(!this._events[name])return;
			for(var a=0;a<this._events[name].length;a++)
			{
			
				this._events[name][a].scope[this._events[name][a].callback](args);
			}
		}
	};
	
	return EventDispatcher;
})();
