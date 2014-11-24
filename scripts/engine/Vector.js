ENGINE2D.Vector = function (properties) {
	this.properties = properties;
};

ENGINE2D.Vector.prototype = {

	constructor: ENGINE2D.Vector,

	Set: function (propertie, value) {
		this.properties[propertie] = value;

		return this;
	},

	UnSet: function (propertie) {
		delete this.properties[propertie];

		return this;
	},

	Merge: function (vector) {
		for ( var propertie in vector.properties) {
			if (vector.properties.hasOwnProperty(propertie)) {
				this.properties[propertie] = vector.properties[propertie];
			}
		}
		return this;
	},

	Assign: function (vector) {
		this.properties = {};
		this.Merge(vector);
		return this;
	},

	Copy: function () {
		return new ENGINE2D.Vector(this.properties.concat());
	},

	ApplyScalar: function (operator, scalar) {
		for ( var propertie in this.properties) {
			if (this.properties.hasOwnProperty(propertie)) {
				this._ApplyOperation(propertie, operator, scalar);
			}
		}
	},

	ApplyScalar2: function (operators, scalar) {
		if (operators.length !== this.properties.length) {
			console.warn('_WARNING: [Vector.ApplyScalar2] number of operators must equal numer of properties');
			return;
		}

		for ( var propertie in this.properties) {
			if (this.properties.hasOwnProperty(propertie)) {
				this._ApplyOperation(propertie, operators[propertie], scalar);
			}
		}
	},

	ApplyVector: function (operator, vector) {
		for ( var propertie in vector.properties) {
			if (vector.properties.hasOwnProperty(propertie)) {
				this._ApplyOperation(propertie, operator, vector.properties[propertie], vector.properties);
			}
		}
	},

	ApplyVector2: function (operators, vector) {
		var n = vector.properties.length;
		if (operators.length !== n ||  n !== this.properties.length) {
			console.warn('_WARNING: [Vector.ApplyVector2] number of operators and vector.properties must equal numer of properties');
			return;
		}

		for ( var propertie in vector.properties) {
			if (vector.properties.hasOwnProperty(propertie)) {
				this._ApplyOperation(propertie, operators[propertie], vector.properties[propertie], vector.properties);
			}
		}
	},

	Get: function (propertie) {
		return this.properties[propertie];
	},

	GetProperties: function () {
		return this.properties;
	},

	_ApplyOperation: function (propertie, operator, value, properties2) {
		if(operator === undefined || value === undefined) {
			console.error('_ERROR: [Vector._ApplyOperation] operator or argument undefined');
			return;
		}

		switch (operator) {
			case ENGINE2D.VECTOROP_ADD: {
				this.properties[propertie] += value;
			} break;
			case ENGINE2D.VECTOROP_SUB: {
				this.properties[propertie] -= value;
			} break;
			case ENGINE2D.VECTOROP_MUL: {
				this.properties[propertie] *= value;
			} break;
			case ENGINE2D.VECTOROP_DIV: {
				if (value === 0) { console.warn('_WARNING: [Vector._ApplyOperation] division by zero'); }
				var invvalue = 1/value;
				this.properties[propertie] *= invvalue;
			} break;
			case ENGINE2D.VECTOROP_POW: {
				this.properties[propertie] = Math.pow(this.properties[propertie],value);
			} break;
			case ENGINE2D.VECTOROP_ASS: {
				this.properties[propertie] = value;
			} break;
			case ENGINE2D.VECTOROP_SWAP: {
				if (properties2 === undefined) { console.warn('_WARNING: [Vector._ApplyOperation] operation not supported'); }
				this.properties[propertie] = properties2[propertie]; properties2[propertie] = value;
			} break;
			case ENGINE2D.VECTOROP_INSERT: {
				this.properties[propertie].Insert(value);
			} break;
			case ENGINE2D.VECTOROP_REMOVE: {
				this.properties[propertie].Remove(value);
			} break;
			case ENGINE2D.VECTOROP_UNION: {
				this.properties[propertie].Union(value);
			} break;
			case ENGINE2D.VECTOROP_INTERSECT: {
				this.properties[propertie].Intersect(value);
			} break;
			case ENGINE2D.VECTOROP_DIFFERENCE: {
				this.properties[propertie].Difference(value);
			} break;
			default: { 
				console.warn('_WARNING: [Vector._ApplyOperation] invalid type.');
			}
		}
	}
};