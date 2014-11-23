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
		

		this.translation.Assign(p);

		/* TODO fix update position*/
		this.position.Assign(p);

		return this;
	},

	Move: function (v) {
		this.isChangedNormal = true;

		this.translation.Add(p);

		/* TODO fix update position*/
		this.position.Assign(this.translation);
		
		return this;
	},

	MoveAlonge: function (axis, d) {
		this.isChangedNormal = true;
		
		this.translation.Add2( axis.x * d.x - axis.y * d.y, axis.y * d.x + axis.x * d.y);

		/* TODO fix update position*/
		this.position.Assign(this.translation);
		
		return this;
	},

	MoveOn: function (axis, alpha) {
		this.isChangedNormal = true;

		this.translation.Add2( axis.x * alpha, axis.y * alpha );

		/* TODO fix update position*/
		this.position.Assign(this.translation);
		
		return this;
	},

	Rotate: function (theta) {
		this.isChangedNormal = true;

		this.rotation += theta;

		/* TODO fix update direction*/

		return this;
	},

	RotateAround: function (p, theta) {
		this.isChangedSpecial = true;

		/*TODO checkit*/
		this.transformation.ApplyTranslate2(-p.x,-p.y);
		this.transformation.Rotate2(theta);

		/* TODO fix update direction and position*/

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

		/* TODO extract scale, rotate, translate and fix update direction, position, scale*/

		console.warn('_WARNING: [Object2D.Transform] function not yet proper');
		return this;
	},

	UpdateMatrix: function () {
		/*TODO ensure proper update, still not oke*/

		if (this.isChangedNormal) {
			this.modelMatrix.SetRotate2(this.rotation);
			this.modelMatrix.ScaleVector2(this.scaling);
			this.modelMatrix.SetTranslateVector2(this.translation);
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
		return this.isChangedNormal || isChangedNormal;
	}
};