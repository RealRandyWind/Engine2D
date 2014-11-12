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
	
	this.moveTo = new ENGINE2D.Vector2( 0.0, 0.0 );
	this.lookAt = new ENGINE2D.Vector2( 0.0, 1.0 );

	this.scaling = new ENGINE2D.Vector2( 1.0, 1.0 );
	this.rotation = 0.0;
	this.translation = new ENGINE2D.Vector2( 0.0, 0.0 );
	this.transformation = new ENGINE2D.Matrix3();

	this.modelMatrix = new ENGINE2D.Matrix3();
	
	this.parent = null;
	this.childeren = {};
	this.isChangedNormal = false;
	this.isChangedSpecial = false;
	this.isRenderable = false;

	this.isLookAt = true;
	this.isMoveTo = true;
};

ENGINE2D.Object2D.prototype = {
	
	constructor: ENGINE2D.Object2D,

	LookAt: function (p) {
		/* TODO */
		this.isChangedNormal = true;
		this.isLookAt = true;
		this.lookAt.Assign(p);
		/*console.warn('_WARNING: [Object2D.RotateAround] function not yet proper');*/
		return this;
	},

	MoveTo: function (p) {
		/* TODO */
		this.isMoveTo = true;
		this.moveTo.Assign(p);
		/*console.warn('_WARNING: [Object2D.RotateAround] function not yet proper');*/
		return this;
	},

	Translate: function (v) {
		this.isChangedNormal = true;

		this.translation.Add(v);
		
		return this;
	},

	TranslateAlonge: function (axis, d) {
		this.isChangedNormal = true;

		this.translation.Add2( axis.x * d.x, axis.y * d.y );
		
		return this;
	},

	TranslateOn: function (axis, alpha) {
		this.isChangedNormal = true;

		this.translation.Add2( axis.x * alpha, axis.y * alpha );
		
		return this;
	},

	TranslateX: function (dx) {
		this.isChangedNormal = true;

		this.translate.x += dx;
		
		return this;
	},

	TranslateY: function (dy) {
		this.isChangedNormal = true;

		this.translate.y += dy;
		
		return this;
	},

	Rotate: function (theta) {
		this.isChangedNormal = true;

		this.rotation += theta;

		return this;
	},

	RotateAround: function (p, theta) {
		this.isChangedSpecial = true;

		/*TODO checkit*/
		this.rotation.Rotate2(theta);
		this.transformation.ApplyTranslate2(-p.x,-p.y);

		/*console.warn('_WARNING: [Object2D.RotateAround] function not yet proper');*/
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

	ScaleX: function (alpha) {
		this.isChangedNormal = true;

		this.scaling.x *= alpha;

		return this;
	},

	ScaleY: function (alpha) {
		this.isChangedNormal = true;

		this.scaling.y *= alpha;

		return this;
	},

	Transform: function (m) {
		this.isChangedSpecial = true;
		
		this.transformation.ApplyMatrix3(m);

		return this;
	},

	UpdateMatrix: function () {
		/*TODO ensure proper update, still not oke*/
		if (this.isChangedNormal) {
			this.modelMatrix.Rotate2(this.rotation);
			this.modelMatrix.ScaleVector2(this.scaling);
			this.modelMatrix.TranslateVector2(this.translation);
			this.rotation = 0;
			this.scaling.SetOne();
			this.translation.SetZero();
		}
		
		if (this.isChangedSpecial) {
			this.modelMatrix.ApplyMatrix3(this.transformation);
			this.transformation.SetIdentity();
		}

		if (this.isMoveTo) {
			this.modelMatrix.SetTranslate2D(this.moveTo);
			this.position.Assign(this.moveTo);
		}

		if (this.isLookAt) {
			/*TODO SOMETHING
			this.modelMatrix.Set2(a11, a12, a13, a21, a22, a23);
			*/
			this.direction.Assign(this.lookAt);
			this.direction.Normalize();
		}

		this.isChangedSpecial = false;
		this.isChangedNormal = false;

		/*console.warn('_WARNING: [Object2D.UpdateMatrix] function not yet proper');*/

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

	ClearChildren: function () {
		this.childeren = {};

		return this;
	}
};