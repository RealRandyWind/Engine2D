ENGINE2D.Vector2 = function (x,y) {
	this.x = x; this.y = y;
};

ENGINE2D.Vector2.prototype = {
	
	constructor: ENGINE2D.Vector2,

	/*ELEMENT WISE OPPERATINOS*/
	Add: function (v) {
		this.x += v.x;
		this.y += v.y;

		return this;
	},

	Sub: function (v) {
		this.x -= v.x;
		this.y -= v.y;
		
		return this;
	},

	Mul: function (v) {
		this.x *= v.x;
		this.y *= v.y;
		
		return this;
	},

	Div: function (v) {
		if (v.x===0 || v.y===0) { console.warn('_WARNING: [Vector2.Div] division by zero'); return this; }

		this.x /= v.x;
		this.y /= v.y;
		
		return this;
	},

	/*ELEMENT WISE ALTERNATIVE OPPERATINOS*/
	Add2: function (x,y) {
		this.x += x;
		this.y += y;

		return this;
	},

	Sub2: function (x,y) {
		this.x -= x;
		this.y -= y;
		
		return this;
	},

	Mul2: function (x,y) {
		this.x *= x;
		this.y *= y;
		
		return this;
	},

	Div2: function (x,y) {
		if (x===0 || y===0) { console.warn('_WARNING: [Vector2.Div2] division by zero'); return this; }

		this.x /= x;
		this.y /= y;
		
		return this;
	},

	Pow2: function (x,y) {
		this.x = Math.pow(this.x,x);
		this.y = Math.pow(this.y,y);
		
		return this;
	},

	/*ASSIGNMENT OPPERATINOS*/
	AddVectors: function (v,u) {
		this.x = v.x + u.x;
		this.y = v.y + u.y;
		
		return this;
	},

	SubVectors: function (v,u) {
		this.x = v.x - u.x;
		this.y = v.y - u.y;
		
		return this;
	},

	MulVectors: function (v,u) {
		this.x = v.x * u.x;
		this.y = v.y * u.y;
		
		return this;
	},

	DivVectors: function (v,u) {
		if (u.x===0 || u.y===0) { console.warn('_WARNING: [Vector2.DivVectors] division by zero'); return this; }
		this.x = v.x / u.x;
		this.y = v.y / u.y;
		
		return this;
	},

	PowVector: function (v,u) {
		this.x = Math.pow(v.x,u.x);
		this.y = Math.pow(v.y,u.y);
		
		return this;
	},

	/*SCALAR OPPERATINOS*/
	AddScalar: function (a) {
		this.x += a;
		this.y += a;
		
		return this;
	},

	SubScalar: function (a) {
		this.x -= a;
		this.y -= a;
		
		return this;
	},

	MulScalar: function (a) {
		this.x *= a;
		this.y *= a;
		
		return this;
	},

	DivScalar: function (a) {
		if (a===0) { console.warn('_WARNING: [Vector2.DivScalar] division by zero'); return this; }

		var inva = 1/a;

		this.x *= inva;
		this.y *= inva;
		
		return this;
	},

	PowScalar: function (a) {
		this.x = Math.pow(this.x,a);
		this.y = Math.pow(this.y,a);

		return this;
	},

	/*SELF OPPERATINOS*/
	Sqrt: function () {
		this.x = Math.sqrt(this.x);
		this.y = Math.sqrt(this.y);
		
		return this;
	},

	Exp: function () {
		this.x = Math.exp(this.x);
		this.y = Math.exp(this.y);
		
		return this;
	},

	Log: function () {
		this.x = Math.log(this.x);
		this.y = Math.log(this.y);
		
		return this;
	},

	/*SPECIAL OPPERATINOS*/
	ApplyMatrix3: function (m) {
		this.x = m.a11 * this.x + m.a12 * m.y + m.a13;
		this.y = m.a21 * this.x + m.a22 * m.y + m.a23;

		if(m.a33!=1) { console.warn('_WARNING: [Vector2.ApplyMatrix3] (a33) in matrix3 vector2 multiplication is not 1'); } 

		return this;
	},

	Random: function () {
		this.x = Math.random();
		this.y = Math.random();
		
		return this;
	},

	Negate: function () {
		this.x = -this.x;
		this.y = -this.y;
		
		return this;
	},

	Abs: function () {
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		
		return this;
	},

	Sign: function () {
		this.x = Math.sign(this.x);
		this.y = Math.sign(this.y);
		
		return this;
	},

	Round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		
		return this;
	},

	Floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		
		return this;
	},

	Ceil: function () {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		
		return this;
	},

	Lerp: function (v,alpha) {
		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;
	},

	Inc: function () {
		++this.x;
		++this.y;

		return this;
	},

	Dec: function () {
		--this.x;
		--this.y;

		return this;
	},

	Flip: function () {
		var tmp = this.x; this.x = this.y; this.y = tmp;

		return this;
	},

	Normalize: function () {
		return this.DivScalar(this.Length());
	},

	Perpendicular: function () {
		var temp = this.x; this.x = -this.y; this.y = temp;

		return this;
	},

	/*VECTOR OPPERATINOS*/
	Length2: function () {
		return this.x* this.x + this.y* this.y;
	},

	Length: function () {
		return Math.sqrt(this.Length2());
	},

	Norm: function (n) {
		if(n===1){
			return this.x + this.y;
		} else if (n===2) {
			return Math.sqrt(this.x* this.x + this.y* this.y);
		} else if (n===Infinity) {
			return this.MaxElement();
		}

		return Math.pow(Math.pow(this.x,n) + Math.pow(this.y,n),1/n);
	},

	Dot: function (v) {
		return this.x*v.x + this.y*v.y;
	},

	Cos: function (v) {
		return this.Dot(v) / ( this.Length() * v.Length() );
	},

	Angle: function (v) {
		if (this.Equals(v)) { return 0; }

		return Math.acos(this.Cos(v));;
	},

	Project: function (v) {
		return ( this.Length() * v.Dot(v) ) / v.Length();
	},

	Magnitude: function (v) {
		return this.x * v.y - this.y * v.x;
	},

	MaxElement: function () {
		return Math.max(this.x,this.y);
	},

	MinElement: function () {
		return Math.min(this.x,this.y);
	},

	/*SETTERS*/
	Set: function (x,y) {
		this.x = x;
		this.y = y;

		return this;
	},

	SetX: function (x) {
		this.x = x;

		return this;
	},

	SetY: function (y) {
		this.y = y;

		return this;
	},

	SetLength: function (l) {
		this.MulScalar( l / this.Length() );

		return this;

	},

	SetZero: function () {
		this.x = this.y = 0;

		return this;
	},

	SetOne: function () {
		this.x = this.y = 1;

		return this;
	},

	SetScalar: function (c) {
		this.x = this.y = c;

		return this;
	},

	Assign: function (v) {
		this.x = v.x;
		this.y = v.y;

		return this;
	},

	AssignNegate: function (v) {
		this.x = -v.x;
		this.y = -v.y;

		return this;
	},

	AssignMax: function (v) {
		this.x = Math.max(this.x,v.x);
		this.y = Math.max(this.y,v.y);

		return this;
	},

	AssignMin: function (v) {
		this.x = Math.min(this.x,v.x);
		this.y = Math.min(this.y,v.y);

		return this;
	},

	Copy: function () {
		return new ENGINE2D.Vector2(this.x, this.y);
	},

	Equals: function (v) {
		return ( this.x == v.x ) && 
      ( this.y == v.y );
	},

	ZeroEps: function (eps) {
		if ( Math.abs( this.x ) <= eps ) { this.x = 0; }
		if ( Math.abs( this.y ) <= eps ) { this.y = 0; }

		return this;
	},

	EqualEps: function (v,eps) {
		if ( Math.abs( this.x - v.x ) <= eps ) { this.x = v.x; }
		if ( Math.abs( this.y - v.y ) <= eps ) { this.y = v.y; }

		return this;
	},

	Clamp: function (min, max) {
		this.x = this.x < min ? min : (this.x > max ? max : this.x );
		this.y = this.y < min ? min : (this.y > max ? max : this.y );

		return this;
	},

	/*CHECKS*/
	EqualsEps: function (v,eps) {
		return ( Math.abs( this.x - v.x ) <= eps ) && 
      ( Math.abs( this.y - v.y ) <= eps );
	},

	Iszero: function (eps) {
		return ( Math.abs( this.x ) <= eps ) && 
      ( Math.abs( this.y ) <= eps );
	}
};