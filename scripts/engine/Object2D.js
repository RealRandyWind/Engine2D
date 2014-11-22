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
	this.scaling = new ENGINE2D.Vector2( 1.0, 1.0 );
	this.rotation = 0.0;
	this.transformation = new ENGINE2D.Matrix3();

	this.modelMatrix = new ENGINE2D.Matrix3();
	
	this.parent = null;
	this.childeren = {};
	this.isDepended = false;
	this.isChangedNormal = false;
	this.isChangedSpecial = false;
	this.isRenderable = false;
};

ENGINE2D.Object2D.prototype = {
	
	constructor: ENGINE2D.Object2D,

	LookAt: function (p) {
		/* TODO */
		this.isChangedNormal = true;
		/*this.rotation*/
		this.direction.Assign(p).Normalize();
		/*console.warn('_WARNING: [Object2D.RotateAround] function not yet proper');*/
		return this;
	},

	MoveTo: function (p) {
		this.isChangedNormal = true;
		this.position.Assign(p);
		
		return this;
	},

	Move: function (v) {
		this.isChangedNormal = true;

		this.position.Add(v);
		
		return this;
	},

	MoveAlonge: function (axis, d) {
		this.isChangedNormal = true;
		this.position.Add2( axis.x * d.x - axis.y * d.y, axis.y * d.x + axis.x * d.y);
		
		return this;
	},

	MoveOn: function (axis, alpha) {
		this.isChangedNormal = true;

		this.position.Add2( axis.x * alpha, axis.y * alpha );
		
		return this;
	},

	Rotate: function (theta) {
		this.isChangedNormal = true;

		/*this.direction*/
		this.rotation += theta;

		return this;
	},

	RotateAround: function (p, theta) {
		this.isChangedSpecial = true;

		/*TODO checkit*/
		this.transformation.ApplyTranslate2(-p.x,-p.y);
		this.transformation.Rotate2(theta);

		/*decopose position and rotation and scaling*/

		console.warn('_WARNING: [Object2D.RotateAround] function not yet proper');
		return this;
	},

	ScaleUniform: function (alpha) {
		this.isChangedNormal = true;
		
		this.scaling.MulScalar(alpha);

		return this;
	},

	Scale: function (v) {
		this.isChangedNormal = true;

		this.scaling.x *= v.x;
		this.scaling.y *= v.y;

		return this;
	},

	Transform: function (m) {
		this.isChangedSpecial = true;
		
		this.transformation.ApplyMatrix3(m);

		/*decopose position and rotation and scaling*/

		console.warn('_WARNING: [Object2D.Transform] function not yet proper');
		return this;
	},

	UpdateMatrix: function () {
		/*TODO ensure proper update, still not oke*/

		if (this.isChangedNormal) {
			this.modelMatrix.Rotate2(this.rotation);
			this.modelMatrix.ScaleVector2(this.scaling);
			this.modelMatrix.SetTranslate2D(this.position);
		}
		
		if (this.isChangedSpecial) {
			this.modelMatrix.ApplyMatrix3(this.transformation);
			console.warn('_WARNING: [Object2D.UpdateMatrix] function not yet proper');
		}

		this.isChangedSpecial = false;
		this.isChangedNormal = false;

		return this;
	},

	UpdateDependent: function () {
		if (this.isChangedNormal || this.isChangedSpecial) {
			console.warn('_WARNING: [Object2D.UpdateDependent] matrix of current object not yet updated, but already used to update childeren.');
		}

		for (var uid in this.childeren) {
			if (!this.childeren.hasOwnProperty(uid)) { continue; }
			
			var child = this.childeren[uid];
			
			if (!child.isDepended) { continue; }

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
		this.childeren[object.uid] = object;

		return this;
	},

	RemoveChild: function (object) {
		delete this.childeren[object.uid];

		return this;
	},

	SetParent: function (object) {
		this.parent = object;
	},

	SetDepended: function (isDepended) {
		this.isDepended = isDepended;
	},

	ClearChildren: function () {
		this.childeren = {};

		return this;
	},

	IsChanged: function (argument) {
		return this.isChangedNormal || isChangedNormal;
	}
};