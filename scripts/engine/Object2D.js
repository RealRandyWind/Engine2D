ENGINE2D.Object2D = function () {
	this.uid = undefined; /* TODO */
	this.ids = {};
	this.type = -1;
	this.group = -1;
	this.category = -1;
	this.isDisabled = false;
	this.layer = -1;

	this.position = new ENGINE2D.Vector2( 0.0, 0.0 );
	this.direction = new ENGINE2D.Vector2( 0.0, 1.0 );

	this.translation = new ENGINE2D.Vector2( 0.0, 0.0 ); 
	this.scaling = new ENGINE2D.Vector2( 1.0, 1.0 );
	this.rotation = 0.0;
	this.transformation = new ENGINE2D.Matrix3();

	this.modelMatrix = new ENGINE2D.Matrix3();
	
	this.parent = undefined;
	this.childeren = {};
	this.isDepended = false;
	this.isRenderable = false;

	this.isTransformed = false;
	this.isChanged = false;
};

ENGINE2D.Object2D.prototype = {
	
	constructor: ENGINE2D.Object2D,

	LookAt: function (p) {
		/* TODO */
		this.isChanged = true;
		/*this.rotation*/
		this.direction.Assign(p).Normalize();
		/*console.warn('_WARNING: [Object2D.RotateAround] function not yet proper');*/
		return this;
	},

	MoveTo: function (p) {
		this.isChanged = true;
		

		this.translation.Assign(p);

		/* TODO fix update position*/
		this.position.Assign(p);

		return this;
	},

	Move: function (v) {
		this.isChanged = true;

		this.translation.Add(p);

		/* TODO fix update position*/
		this.position.Assign(this.translation);
		
		return this;
	},

	MoveAlonge: function (axis, d) {
		this.isChanged = true;
		
		this.translation.Add2( axis.x * d.x - axis.y * d.y, axis.y * d.x + axis.x * d.y);

		/* TODO fix update position*/
		this.position.Assign(this.translation);
		
		return this;
	},

	MoveOn: function (axis, alpha) {
		this.isChanged = true;

		this.translation.Add2( axis.x * alpha, axis.y * alpha );

		/* TODO fix update position*/
		this.position.Assign(this.translation);
		
		return this;
	},

	Rotate: function (theta) {
		if(isNaN(theta)) { 
			console.warn('_WARNING: [Object2D.Rotate] alpha is not a number');
			return this; 
		}

		this.isChanged = true;

		this.rotation += theta;

		/* TODO fix update direction*/

		return this;
	},

	SetRotate: function (theta) {
		if(isNaN(theta)) { 
			console.warn('_WARNING: [Object2D.SetRotate] alpha is not a number');
			return this; 
		}
		
		this.isChanged = true;

		this.rotation = theta;

		/* TODO fix update direction*/

		return this;
	},

	RotateAround: function (p, theta) {
		if(isNaN(theta)) { 
			console.warn('_WARNING: [Object2D.RotateAround] alpha is not a number');
			return this; 
		}

		this.isChanged = true;
		this.isTransformed = true;

		/*TODO checkit*/
		this.transformation.ApplyTranslate2(-p.x,-p.y);
		this.transformation.Rotate2(theta);

		/* TODO fix update direction and position*/

		console.warn('_WARNING: [Object2D.RotateAround] function not yet proper');
		return this;
	},

	ScaleUniform: function (alpha) {
		this.isChanged = true;
		
		this.scaling.MulScalar(alpha);

		return this;
	},

	Scale: function (v) {
		this.isChanged = true;

		this.scaling.Mul(v);

		return this;
	},

	SetScale: function (v) {
		this.isChanged = true;

		this.scaling.Assign(v);

		return this;
	},

	Transform: function (m) {
		this.isChanged = true;
		this.isTransformed = true;
		
		this.transformation.ApplyMatrix3(m);

		/* TODO extract scale, rotate, translate and fix update direction, position, scale*/

		console.warn('_WARNING: [Object2D.Transform] function not yet proper');
		return this;
	},

	SetTransform: function (m) {
		this.isChanged = true;
		this.isTransformed = true;
		
		this.transformation.Assign(m);

		/* TODO extract scale, rotate, translate and fix update direction, position, scale*/

		console.warn('_WARNING: [Object2D.Transform] function not yet proper');
		return this;
	},

	UpdateMatrix: function () {
		/*TODO ensure proper update, still not oke*/
		if (this.isChanged) {
			this.modelMatrix.SetRotate2(this.rotation);
			this.modelMatrix.ScaleVector2(this.scaling);			
			this.modelMatrix.SetTranslateVector2(this.translation);

			/* TODO where to place transformation? before or after tranlation?*/
			if (this.isTransformed) {
				this.modelMatrix.ApplyMatrix3(this.transformation);
			}
		}

		this.isChanged = false;

		return this;
	},

	UpdateDependent: function () {
		if (this.isChanged) {
			console.warn('_WARNING: [Object2D.UpdateDependent] matrix of current object not yet updated, but already used to update childeren dependencies.');
		}

		for (var uid in this.childeren) {
			if (!this.childeren.hasOwnProperty(uid)) { continue; }
			
			var child = this.childeren[uid];
			
			if (!child.isDepended) { continue; }

			if (child.isChanged) {
				console.warn('_WARNING: [Object2D.UpdateDependent] matrix of current child not yet updated, but already used to update dependency.');
			}

			child.Transform(this.modelMatrix);
			child.UpdateMatrix();
			child.UpdateDependent();
		}

		console.warn('_WARNING: [Object2D.UpdateDependent] function not yet proper');
		return this;
	},

	GetModelMatrix: function () {
		return this.modelMatrix;
	},

	GetParent: function () {
		return this.parent;
	},

	GetChildren: function () {
		return this.childeren;
	},

	AddChild: function (object) {
		if (object.parent !== undefined) {
			object.parent.RemoveChild(object);
		}

		object.parent = this;
		this.childeren[object.uid] = object;

		return this;
	},

	RemoveChild: function (object) {
		delete this.childeren[object.uid];
		this.object.parent = undefined;

		return this;
	},

	SetDepended: function (isDepended) {
		this.isDepended = isDepended;
	},

	ClearChildren: function () {
		for (var uid in this.childeren) {
			if (this.childeren.hasOwnProperty(uid)) {
				this.childeren[uid].parent = undefined;
			}
		}

		this.childeren = {};

		return this;
	},

	IsChanged: function () {
		return this.isChanged;
	}
};