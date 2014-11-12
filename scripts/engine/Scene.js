ENGINE2D.Scene = function (logManager) {
	this.logManager = logManager;

	this.uid = 0;/*undefined; TODO */
	this.objectDS = undefined;
	this.renderables = [];
	this.emptys = [];
	this.boundarys = [];
	this.triggers = [];
	this.staticObjects = [];
	this.dynamicObjects = [];
	this.interactingObjects = [];
	this.audioObjects = [];
	this.cameras = [];

	this.isSorted = true;

	/* Note that if we use [] than we need
	 * to deframentate the array once in a
	 * certain amound of removes.
	 */
};

ENGINE2D.Scene.prototype = {

	constructor: ENGINE2D.Scene,

	Add: function (object) {
		if (object.ids[this.uid] !== undefined) { 
			this.logManager.Warning('[Scene.Add] object already in this scene.');
			return this; 
		}

		var array = this.GetTypes(object.type);
		var entrys = {id: array.length, index: -1};

		object.ids[this.uid] = entrys;
		array.push(object);

		/* TODO reverse order by layer so rendering
		 * is executed in correct order, sort won't 
		 * work since it will preminantly change, 
		 * avoid copying renderable array each 
		 * iteration.
		 */

		if (object.isRenderable) {
			entrys.index = this.renderables.length;
			this.renderables.push(object);
		}

		this.isSorted = this.renderables.length < 2;

		return this;
	},

	Remove: function (object) {
		var array = this.GetTypes(object.type);
		var entrys = object.ids[this.uid];
		if (entrys === undefined) {
			this.logManager.Warning('[Scene.Remove] object already not in this scene.');
			return this;
		}

		delete array[entrys.id];
		delete object.ids[this.uid];

		if (object.isRenderable) {
			delete this.renderables[entrys.index];
		}

		return this;
	},

	Get: function (type, id) {
		var array = this.GetTypes(type);
		return array[id];
	},

	SetDS: function (objectDS) {
		this.objectDS = objectDS;

		return this;
	},

	UpdateDS: function () {
		/* TODO Recompute DS */
		console.error('_ERROR: [Scene.UpdateDS] function not yet implemented');
	},

	GetDS: function () {
		return this.objectDS;
	},

	UpdateObjects: function () {
		for (var i = this.dynamicObjects.length - 1; i >= 0; i--) {
			this.dynamicObjects[i].UpdateMatrix();
		};

		for (var i = this.interactingObjects.length - 1; i >= 0; i--) {
			this.interactingObjects[i].UpdateMatrix();
		};

		for (var i = this.audioObjects.length - 1; i >= 0; i--) {
			this.audioObjects[i].UpdateMatrix();
		};

		for (var i = this.cameras.length - 1; i >= 0; i--) {
			this.cameras[i].UpdateMatrix();
		};
	},

	GetTypes: function (type) {
		switch (type) {
			case ENGINE2D.OBJECT2DTYPE_EMPTY: {
				return this.emptys;
			}
			case ENGINE2D.OBJECT2DTYPE_BOUNDARY: {
				return this.boundarys;
			}
			case ENGINE2D.OBJECT2DTYPE_TRIGGER: {
				return this.triggers;
			}
			case ENGINE2D.OBJECT2DTYPE_STATIC: {
				return this.staticObjects;
			}
			case ENGINE2D.OBJECT2DTYPE_DYNAMIC: {
				return this.dynamicObjects;
			}
			case ENGINE2D.OBJECT2DTYPE_INTERACTING: {
				return this.interactingObjects;
			}
			case ENGINE2D.OBJECT2DTYPE_AUDIO: {
				return this.audioObjects;
			}
			case ENGINE2D.OBJECT2DTYPE_CAMERA: {
				return this.cameras;
			}
			default: { 
				this.logManager.Warning('[Scene.GetTypes] invalid type.');
				return undefined;
			}
		}
	},

	_SortRenderables: function () {
		if (this.isSorted) {
			return;
		}
		/* TODO SORT and ajust indices
		var array = this.renderables;
		var j = 0;
		for (var i = array.length - 1; i >= 0; i--) {
			if (array[i].layer > array[j].layer) {
				Do something 
				var temp = array[i]; array[i] = array[j]; array[j] = temp;
			}
			Do more
			++j;
		};
		*/
	}
};