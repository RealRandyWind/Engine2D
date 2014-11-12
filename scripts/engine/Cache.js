ENGINE2D.Cache = function () {

	this.resources = {};

};

ENGINE2D.Cache.prototype = {

	constructor: ENGINE2D.Cache,

	Add: function ( key, resource ) {
		this.resources[key] = resource;
	},

	Remove: function (key) {
		delete this.resources[key];
	},

	Get: function (key) {
		return this.resources[key];
	},

	Clear: function () {
		this.resources = {};
	}

};