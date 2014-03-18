var _Class = {

	/**
	 * Checks to see if object is actually an Object
	 * @param  {*}  obj Object to check
	 * @return {boolean}
	 */
	isObject : function(obj) {
		return typeof obj === 'object';
	},

	/**
	 * Checks to see if object is of type, Array
	 * @param  {*}  array Object to check
	 * @return {boolean}
	 */
	isArray : function(array) {
		return array instanceof Array;
	},

	/**
	 * Checks to see if object is of type, function
	 * @param  {*}  fn Object to check
	 * @return {boolean}
	 */
	isFunction : function(fn) {
		return typeof fn === 'function';
	},

	/**
	 * Checks to see if object is of type, number
	 * @param  {*}  n Object to check
	 * @return {boolean}
	 */
	isNumber : function(n) {
		return typeof n === 'number';
	},

	/**
	 * Clone an object
	 * @param  {Object|Array} obj  Object or Array to clone
	 * @param  {boolean=} deep Perform a deep clone
	 * @return {Object|Array}
	 */
	clone : function(obj, deep) {

		// if (!_Class.isObject(obj))
			// throw 'Can only clone objects and/or arrays';

		var result = obj instanceof Array ? [] : {};
		for (var key in obj) {
			if ( typeof obj[key] === 'object' && deep === true) {
				result[key] = _Class.clone(obj[key], deep);
			} else {
				result[key] = obj[key];
			}
		}

		return result;

	},

	extend : function(obj, base,p) {
		
		var pro = this.clone(obj.prototype,true);
		
		
		obj.prototype = Object.create(new base());
		
		obj.prototype.constructor = obj;
		
		obj.prototype._baseClass = base;
		
		Object.defineProperty(obj.prototype, 'constructor', {
			enumerable : false,
			value : obj
		});
		
		
		if(pro)this.proto(obj,pro);
		if(p)this.proto(obj,p);
		

	},
	_super : function(obj, method) {
		obj._baseClass.prototype[method].apply(obj, Array(arguments).splice(0, 1));
	},
	proto : function(_class, obj) {
		for (var name in obj) {
			_class.prototype[name] = obj[name];
		}
	},
	construct : function(_class, obj) {
		for (var name in obj) {
			if(name!="prototype" && name!="_proto")_class[name] = obj[name];
		}
	}
}; 