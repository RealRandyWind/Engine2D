ENGINE2D.Matrix3 = function () {
	this.SetIdentity();
};

/* Note throw away all not used at the end.
 */
ENGINE2D.Matrix3.prototype = {

	constructor: ENGINE2D.Matrix3,

	Rotate2: function (theta) {
		var b11 = Math.cos(theta); var b12 = -Math.sin(theta);
		var b21 = Math.sin(theta); var b22 = Math.cos(theta);

		this.a11 = this.a11 * b11 + this.a12 * b21; this.a12 = this.a11 * b12 + this.a12 * b22;
		this.a21 = this.a21 * b11 + this.a22 * b21; this.a22 = this.a21 * b12 + this.a22 * b22;

		return this;
	},

	/*SPECIAL MATRIX OPERATIONS*/
	Translate2: function (dx, dy) {
		this.a13 += dx;
		this.a23 += dy;

		return this;
	},

	ScaleUniform: function (c) {
		this.a11 *= c; this.a12 *= c; this.a13 *= c;
		this.a21 *= c; this.a22 *= c; this.a23 *= c;
	},

	Scale2: function (cx,cy) {
		this.a11 *= cx; this.a12 *= cx; this.a13 *= cx;
		this.a21 *= cy; this.a22 *= cy; this.a23 *= cy;

		return this;
	},

	ScaleVector2: function (c) {
		this.a11 *= c.x; this.a12 *= c.x; this.a13 *= c.x;
		this.a21 *= c.y; this.a22 *= c.y; this.a23 *= c.y;

		return this;
	},

	TranslateVector2: function (v) {
		this.a13 += v.x;
		this.a23 += v.y;

		return this;
	},

	TransformVector2: function (u,v) {
		var c11 = this.a11; var c12 = this.a12;
		var c21 = this.a21; var c22 = this.a22;

		this.a11 = u.x * c11 + u.y * c12; this.a12 = v.x * c11 + v.y * c12;
		this.a21 = u.x * c21 + u.y * c22; this.a22 = v.x * c21 + v.y * c22;

		return this;
	},

	Transform2: function (ux,uy,vx,vy) {
		var c11 = this.a11; var c12 = this.a12;
		var c21 = this.a21; var c22 = this.a22;

		this.a11 = ux * c11 + uy * c12; this.a12 = vx * c11 + vy * c12;
		this.a21 = ux * c21 + uy * c22; this.a22 = vx * c21 + vy * c22;

		return this;
	},

	ApplyTranslate: function (dx,dy) {
		this.a13 += dx * this.a11 + dy * this.a12;
		this.a23 += dx * this.a21 + dy * this.a22;

		return this;
	},

	ApplyTranslateVector2: function (v) {
		this.a13 += v.x * this.a11 + v.y * this.a12;
		this.a23 += v.x * this.a21 + v.y * this.a22;

		return this;
	},

	/*ASSIGNMENT OPERATIONS*/

	ApplyMatrices3: function (b,m) {
		this.a11 = b.a11 * m.a11 + b.a12 * m.a21 + b.a13 * m.a31;
		this.a21 = b.a21 * m.a11 + b.a22 * m.a21 + b.a23 * m.a31;
		this.a31 = b.a31 * m.a11 + b.a32 * m.a21 + b.a33 * m.a31;

		this.a12 = b.a11 * m.a12 + b.a12 * m.a22 + b.a13 * m.a32;
		this.a22 = b.a21 * m.a12 + b.a22 * m.a22 + b.a23 * m.a32;
		this.a32 = b.a31 * m.a12 + b.a32 * m.a22 + b.a33 * m.a32;

		this.a13 = b.a11 * m.a13 + b.a12 * m.a23 + b.a13 * m.a33;
		this.a23 = b.a21 * m.a13 + b.a22 * m.a23 + b.a23 * m.a33;
		this.a33 = b.a31 * m.a13 + b.a32 * m.a23 + b.a33 * m.a33;

		return this;
	},

	ApplyMatrix3: function (m) {
		var c11 = this.a11; var c12 = this.a12; var c13 = this.a13;
		var c21 = this.a21; var c22 = this.a22; var c23 = this.a23;
		var c31 = this.a31; var c32 = this.a32; var c33 = this.a33;

		this.a11 = c11 * m.a11 + c12 * m.a21 + c13 * m.a31;
		this.a21 = c21 * m.a11 + c22 * m.a21 + c23 * m.a31;
		this.a31 = c31 * m.a11 + c32 * m.a21 + c33 * m.a31;

		this.a12 = c11 * m.a12 + c12 * m.a22 + c13 * m.a32;
		this.a22 = c21 * m.a12 + c22 * m.a22 + c23 * m.a32;
		this.a32 = c31 * m.a12 + c32 * m.a22 + c33 * m.a32;

		this.a13 = c11 * m.a13 + c12 * m.a23 + c13 * m.a33;
		this.a23 = c21 * m.a13 + c22 * m.a23 + c23 * m.a33;
		this.a33 = c31 * m.a13 + c32 * m.a23 + c33 * m.a33;

		return this;
	},

	Mul: function (m) {
		this.a11 *= m.a11; this.a12 *= m.a12; this.a13 *= m.a13;
		this.a21 *= m.a21; this.a22 *= m.a22; this.a23 *= m.a23;
		this.a31 *= m.a31; this.a32 *= m.a32; this.a33 *= m.a33;

		return this;
	},

	Div: function (m) {
		if (m.a11===0 || m.a12===0 || m.a13===0 || 
			m.a21===0 || m.a22===0 || m.a23===0 || 
			m.a31===0 || m.a32===0 || m.a33===0) 
			{ console.warn('_WARNING: [Matrix3.Div] division by zero'); return this; }

		this.a11 /= m.a11; this.a12 /= m.a12; this.a13 /= m.a13;
		this.a21 /= m.a21; this.a22 /= m.a22; this.a23 /= m.a23;
		this.a31 /= m.a31; this.a32 /= m.a32; this.a33 /= m.a33;

		return this;
	},

	Add: function (m) {
		this.a11 += m.a11; this.a12 += m.a12; this.a13 += m.a13;
		this.a21 += m.a21; this.a22 += m.a22; this.a23 += m.a23;
		this.a31 += m.a31; this.a32 += m.a32; this.a33 += m.a33;

		return this;
	},

	Sub: function (m) {
		this.a11 -= m.a11; this.a12 -= m.a12; this.a13 -= m.a13;
		this.a21 -= m.a21; this.a22 -= m.a22; this.a23 -= m.a23;
		this.a31 -= m.a31; this.a32 -= m.a32; this.a33 -= m.a33;

		return this;
	},

	Pow: function (m) {
		this.a11 = Math.pow(this.a11,m.a11); this.a12 = Math.pow(this.a12,m.a12); this.a13 = Math.pow(this.a13,m.a13);
		this.a21 = Math.pow(this.a21,m.a21); this.a22 = Math.pow(this.a22,m.a22); this.a23 = Math.pow(this.a23,m.a23);
		this.a31 = Math.pow(this.a31,m.a31); this.a32 = Math.pow(this.a32,m.a32); this.a33 = Math.pow(this.a33,m.a33);

		return this;
	},

	/*MATRIX OPERATIONS*/
	MulMatrices: function (m,b) {
		this.a11 = m.a11 * b.a11; this.a12 = m.a12 * b.a12; this.a13 = m.a13 * b.a13;
		this.a21 = m.a21 * b.a21; this.a22 = m.a22 * b.a22; this.a23 = m.a23 * b.a23;
		this.a31 = m.a31 * b.a31; this.a32 = m.a32 * b.a32; this.a33 = m.a33 * b.a33;

		return this;
	},

	DivMatrices: function (m,b) {
		if (b.a11===0 || b.a12===0 || b.a13===0 || 
			b.a21===0 || b.a22===0 || b.a23===0 || 
			b.a31===0 || b.a32===0 || b.a33===0) 
			{ console.warn('_WARNING: [Matrix3.DivMatrices] division by zero'); return this; }

		this.a11 = m.a11 / b.a11; this.a12 = m.a12 / b.a12; this.a13 = m.a13 / b.a13;
		this.a21 = m.a21 / b.a21; this.a22 = m.a22 / b.a22; this.a23 = m.a23 / b.a23;
		this.a31 = m.a31 / b.a31; this.a32 = m.a32 / b.a32; this.a33 = m.a33 / b.a33;

		return this;
	},

	AddMatrices: function (m,b) {
		this.a11 = m.a11 + b.a11; this.a12 = m.a12 + b.a12; this.a13 = m.a13 + b.a13;
		this.a21 = m.a21 + b.a21; this.a22 = m.a22 + b.a22; this.a23 = m.a23 + b.a23;
		this.a31 = m.a31 + b.a31; this.a32 = m.a32 + b.a32; this.a33 = m.a33 + b.a33;

		return this;
	},

	SubMatrices: function (m,b) {
		this.a11 = m.a11 - b.a11; this.a12 = m.a12 - b.a12; this.a13 = m.a13 - b.a13;
		this.a21 = m.a21 - b.a21; this.a22 = m.a22 - b.a22; this.a23 = m.a23 - b.a23;
		this.a31 = m.a31 - b.a31; this.a32 = m.a32 - b.a32; this.a33 = m.a33 - b.a33;

		return this;
	},

	PowMatrices: function (m,b) {
		this.a11 = Math.pow(m.a11, b.a11); this.a12 = Math.pow(m.a12, b.a12); this.a13 = Math.pow(m.a13, b.a13);
		this.a21 = Math.pow(m.a21, b.a21); this.a22 = Math.pow(m.a22, b.a22); this.a23 = Math.pow(m.a23, b.a23);
		this.a31 = Math.pow(m.a31, b.a31); this.a32 = Math.pow(m.a32, b.a32); this.a33 = Math.pow(m.a33, b.a33);

		return this;
	},

	/*SCALAR OPERATIONS*/
	MulScalar: function (c) {
		this.a11 *= c; this.a12 *= c; this.a13 *= c;
		this.a21 *= c; this.a22 *= c; this.a23 *= c;
		this.a31 *= c; this.a32 *= c; this.a33 *= c;

		return this;
	},

	DivScalar: function (c) {
		if (c===0) { console.warn('_WARNING: [Matrix3.DivScalar] division by zero'); return this; }

		var ainv = 1/c;

		this.a11 *= ainv; this.a12 *= ainv; this.a13 *= ainv;
		this.a21 *= ainv; this.a22 *= ainv; this.a23 *= ainv;
		this.a31 *= ainv; this.a32 *= ainv; this.a33 *= ainv;

		return this;
	},

	AddScalar: function (c) {
		this.a11 += c; this.a12 += c; this.a13 += c;
		this.a21 += c; this.a22 += c; this.a23 += c;
		this.a31 += c; this.a32 += c; this.a33 += c;

		return this;
	},

	SubScalar: function (c) {
		this.a11 -= c; this.a12 -= c; this.a13 -= c;
		this.a21 -= c; this.a22 -= c; this.a23 -= c;
		this.a31 -= c; this.a32 -= c; this.a33 -= c;

		return this;
	},

	PowScalar: function (c) {
		this.a11 = Math.pow(this.a11,c); this.a12 = Math.pow(this.a12,c); this.a13 = Math.pow(this.a13,c);
		this.a21 = Math.pow(this.a21,c); this.a22 = Math.pow(this.a22,c); this.a23 = Math.pow(this.a23,c);
		this.a31 = Math.pow(this.a31,c); this.a32 = Math.pow(this.a32,c); this.a33 = Math.pow(this.a33,c);

		return this;
	},

	/*SELF OPPERATINOS*/
	Sqrt: function () {
		this.a11 = Math.sqrt(this.a11); this.a12 = Math.sqrt(this.a12); this.a13 = Math.sqrt(this.a13);
		this.a21 = Math.sqrt(this.a21); this.a22 = Math.sqrt(this.a22); this.a23 = Math.sqrt(this.a23);
		this.a31 = Math.sqrt(this.a31); this.a32 = Math.sqrt(this.a32); this.a33 = Math.sqrt(this.a33);
		
		return this;
	},

	Exp: function () {
		this.a11 = Math.exp(this.a11); this.a12 = Math.exp(this.a12); this.a13 = Math.exp(this.a13);
		this.a21 = Math.exp(this.a21); this.a22 = Math.exp(this.a22); this.a23 = Math.exp(this.a23);
		this.a31 = Math.exp(this.a31); this.a32 = Math.exp(this.a32); this.a33 = Math.exp(this.a33);
		
		return this;
	},

	Log: function () {
		this.a11 = Math.log(this.a11); this.a12 = Math.log(this.a12); this.a13 = Math.log(this.a13);
		this.a21 = Math.log(this.a21); this.a22 = Math.log(this.a22); this.a23 = Math.log(this.a23);
		this.a31 = Math.log(this.a31); this.a32 = Math.log(this.a32); this.a33 = Math.log(this.a33);
		
		return this;
	},


	/*SPECIAL OPPERATINOS*/
	Random: function () {
		this.a11 = Math.rand(); this.a12 = Math.rand(); this.a13 = Math.rand();
		this.a21 = Math.rand(); this.a22 = Math.rand(); this.a23 = Math.rand();
		this.a31 = Math.rand(); this.a32 = Math.rand(); this.a33 = Math.rand();
		
		return this;
	},

	Negate: function () {
		this.a11 = -this.a11; this.a12 = -this.a12; this.a13 = -this.a13;
		this.a21 = -this.a21; this.a22 = -this.a22; this.a23 = -this.a23;
		this.a31 = -this.a31; this.a32 = -this.a32; this.a33 = -this.a33;
		
		return this;
	},

	NegateTranslate: function () {
		this.a13 = -this.a13;
		this.a23 = -this.a23;
		
		return this;
	},

	NegateM2: function () {
		this.a11 = -this.a11; this.a12 = -this.a12;
		this.a21 = -this.a21; this.a22 = -this.a22;
	},

	Abs: function () {
		this.a11 = Math.abs(this.a11); this.a12 = Math.abs(this.a12); this.a13 = Math.abs(this.a13);
		this.a21 = Math.abs(this.a21); this.a22 = Math.abs(this.a22); this.a23 = Math.abs(this.a23);
		this.a31 = Math.abs(this.a31); this.a32 = Math.abs(this.a32); this.a33 = Math.abs(this.a33);
		
		return this;
	},

	Sign: function () {
		this.a11 = Math.sign(this.a11); this.a12 = Math.sign(this.a12); this.a13 = Math.sign(this.a13);
		this.a21 = Math.sign(this.a21); this.a22 = Math.sign(this.a22); this.a23 = Math.sign(this.a23);
		this.a31 = Math.sign(this.a31); this.a32 = Math.sign(this.a32); this.a33 = Math.sign(this.a33);
		
		return this;
	},

	Round: function () {
		this.a11 = Math.round(this.a11); this.a12 = Math.round(this.a12); this.a13 = Math.round(this.a13);
		this.a21 = Math.round(this.a21); this.a22 = Math.round(this.a22); this.a23 = Math.round(this.a23);
		this.a31 = Math.round(this.a31); this.a32 = Math.round(this.a32); this.a33 = Math.round(this.a33);
		
		return this;
	},

	Floor: function () {
		this.a11 = Math.floor(this.a11); this.a12 = Math.floor(this.a12); this.a13 = Math.floor(this.a13);
		this.a21 = Math.floor(this.a21); this.a22 = Math.floor(this.a22); this.a23 = Math.floor(this.a23);
		this.a31 = Math.floor(this.a31); this.a32 = Math.floor(this.a32); this.a33 = Math.floor(this.a33);
		
		return this;
	},

	Ceil: function () {
		this.a11 = Math.ceil(this.a11); this.a12 = Math.ceil(this.a12); this.a13 = Math.ceil(this.a13);
		this.a21 = Math.ceil(this.a21); this.a22 = Math.ceil(this.a22); this.a23 = Math.ceil(this.a23);
		this.a31 = Math.ceil(this.a31); this.a32 = Math.ceil(this.a32); this.a33 = Math.ceil(this.a33);
		
		return this;
	},

	Lerp: function (m,alpha) {
		this.a11 += ( m.a11 - this.a11 ) * alpha; this.a12 += ( m.a12 - this.a12 ) * alpha; this.a13 += ( m.a13 - this.a13 ) * alpha;
		this.a21 += ( m.a21 - this.a21 ) * alpha; this.a22 += ( m.a22 - this.a22 ) * alpha; this.a23 += ( m.a23 - this.a23 ) * alpha;
		this.a31 += ( m.a31 - this.a31 ) * alpha; this.a32 += ( m.a32 - this.a32 ) * alpha; this.a33 += ( m.a33 - this.a33 ) * alpha;

		return this;
	},

	Inc: function () {
		++this.a11; ++this.a12; ++this.a13;
		++this.a21; ++this.a22; ++this.a23;
		++this.a31; ++this.a32; ++this.a33;

		return this;
	},

	Dec: function () {
		--this.a11; --this.a12; --this.a13;
		--this.a21; --this.a22; --this.a23;
		--this.a31; --this.a32; --this.a33;

		return this;
	},

	Transpose: function () {
		var tmp = this.a12; this.a12 = this.a21; this.a21 = tmp;
		tmp = this.a13; this.a13 = this.a31; this.a31 = tmp;
		tmp = this.a32; this.a32 = this.a23; this.a23 = tmp;

		return this;
	},

	Normalize: function () {
		return this.DivScalar(this.Norm(2));
	},

	Norm: function (n) {
		if(n===1){
			return this.a11 + this.a12 + this.a13 + 
        this.a21 + this.a22 + this.a23 + 
        this.a31 + this.a32 + this.a33;
		} else if (n===2) {
			return Math.sqrt( this.a11*this.a11 + this.a12*this.a12 + this.a13*this.a13 + 
                        this.a21*this.a21 + this.a22*this.a22 + this.a23*this.a23 + 
                        this.a31*this.a31 + this.a32*this.a32 + this.a33*this.a33);
		} else if (n===Infinity) {
			return this.MaxElement();
		}

		return Math.pow( Math.pow(this.a11,n) + Math.pow(this.a12,n) + Math.pow(this.a13,n) + 
                     Math.pow(this.a21,n) + Math.pow(this.a22,n) + Math.pow(this.a23,n) + 
                     Math.pow(this.a31,n) + Math.pow(this.a32,n) + Math.pow(this.a33,n),
                     1/n);
	},

	Det: function () {
		return ( this.a11 * this.a22 * this.a33 + 
    			 	 this.a12 * this.a23 * this.a31 + 
      			 this.a13 * this.a21 * this.a32 ) - 
      		 ( this.a13 * this.a22 * this.a31 + 
      			 this.a12 * this.a21 * this.a33 + 
      			 this.a11 * this.a23 * this.a32 );
	},

	Invert: function () {
		var aDet = this.Det();
		
		if(aDet === 0) { console.warn('_WARNING: [Matrix3.Invert] can\'t invert matrix, determinant is 0'); return this; }

		this.MulScalar(1/aDet);

		return this;
	},

	MaxElement: function () {
		return Math.max(this.a11, this.a12, this.a13, this.a21, this.a22, this.a23, this.a31, this.a32, this.a33);
	},

	MinElement: function () {
		return Math.min(this.a11, this.a12, this.a13, this.a21, this.a22, this.a23, this.a31, this.a32, this.a33);
	},

	/*SETTERS*/
	Set: function (a11, a12, a13, a21, a22, a23, a31, a32, a33) {
		this.a11 = a11; this.a12 = a12; this.a13 = a13;
		this.a21 = a21; this.a22 = a22; this.a23 = a23;
		this.a31 = a31; this.a32 = a32; this.a33 = a33;

		return this;
	},

	Set2: function (a11, a12, a13, a21, a22, a23) {
		this.a11 = a11; this.a12 = a12; this.a13 = a13; 
		this.a21 = a21; this.a22 = a22; this.a23 = a23;

		return this;
	},

	SetM2: function (a11, a12, a21, a22) {
		this.a11 = a11; this.a12 = a12;
		this.a21 = a21; this.a22 = a22;

		return this;
	},

	SetVector2: function (c1,c2,c3) {
		this.a11 = c1.x; this.a12 = c2.x; this.a13 = c3.x; 
		this.a21 = c1.y; this.a22 = c2.y; this.a23 = c3.y;

		return this;
	},

	SetVectorM2: function (c1, c2) {
		this.a11 = c1.x; this.a12 = c2.x;
		this.a21 = c1.y; this.a22 = c2.y;

		return this;
	},

	SetDiagonal: function (a11, a22, a33) {
		this.a11 = a11; 
		this.a22 = a22;
		this.a33 = a33;

		return this;
	},

	SetDiagonal2: function (a11, a22) {
		this.a11 = a11; 
		this.a22 = a22;

		return this;
	},

	SetVectorDiagonal2D: function (d) {
		this.a11 = d.x;
		this.a22 = d.y;

		return this;
	},

	SetRotate2: function (theta) {
		this.a11 = Math.cos(theta); this.a12 = -Math.sin(theta);
		this.a21 = Math.sin(theta); this.a22 = Math.cos(theta);

		return this;
	},

	SetTranslate2D: function (p) {
		this.a13 = p.x;
		this.a23 = p.y;
	},

	SetTranslate2: function (x, y) {
		this.a13 = x;
		this.a23 = y;
	},

	SetMVP: function (model,view,projection) {
		this.ApplyMatrices3(projection,view);
		this.ApplyMatrix3(model);

		return this;
	},

	SetZero: function () {
		this.a11 = this.a12 = this.a13 = this.a21 = this.a22 = this.a23 = this.a31 = this.a32 = this.a33 = 0;

		return this;
	},

	SetOne: function () {
		this.a11 = this.a12 = this.a13 = this.a21 = this.a22 = this.a23 = this.a31 = this.a32 = this.a33 = 1;

		return this;
	},

	SetIdentity: function () {
		this.a11 = 1; this.a12 = 0; this.a13 = 0;
		this.a21 = 0; this.a22 = 1; this.a23 = 0;
		this.a31 = 0; this.a32 = 0; this.a33 = 1;
	},

	SetScalar: function (c) {
		this.a11 = this.a12 = this.a13 = this.a21 = this.a22 = this.a23 = this.a31 = this.a32 = this.a33 = c;

		return this;
	},

	SetA11: function (a11) {
		this.a11 = a11;

		return this;
	},

	SetA12: function (a12) {
		this.a12 = a12;

		return this;
	},

	SetA13: function (a13) {
		this.a13 = a13;

		return this;
	},

	SetA21: function (a21) {
		this.a21 = a21;

		return this;
	},

	SetA22: function (a22) {
		this.a22 = a22;

		return this;
	},

	SetA23: function (a23) {
		this.a23 = a23;

		return this;
	},

	SetA31: function (a31) {
		this.a31 = a31;

		return this;
	},

	SetA32: function (a32) {
		this.a32 = a32;

		return this;
	},

	SetA33: function (a33) {
		this.a33 = a33;

		return this;
	},

	SetNorm: function (l) {
		this.MulScalar( l / this.Norm(2) );

		return this;

	},

	Assign: function (m) {
		this.a11 = m.a11; this.a12 = m.a12; this.a13 = m.a13;
		this.a21 = m.a21; this.a22 = m.a22; this.a23 = m.a23;
		this.a31 = m.a31; this.a32 = m.a32; this.a33 = m.a33;

		return this;
	},

	AssignNegate: function (m) {
		this.a11 = -m.a11; this.a12 = -m.a12; this.a13 = -m.a13;
		this.a21 = -m.a21; this.a22 = -m.a22; this.a23 = -m.a23;
		this.a31 = -m.a31; this.a32 = -m.a32; this.a33 = -m.a33;

		return this;
	},

	AssignMax: function (m) {
		this.a11 = Math.max(this.a11,m.a11); this.a12 = Math.max(this.a12,m.a12); this.a13 = Math.max(this.a13,m.a13);
		this.a21 = Math.max(this.a21,m.a21); this.a22 = Math.max(this.a22,m.a22); this.a23 = Math.max(this.a23,m.a23);
		this.a31 = Math.max(this.a31,m.a31); this.a32 = Math.max(this.a32,m.a32); this.a33 = Math.max(this.a33,m.a33);

		return this;
	},

	AssignMin: function (m) {
		this.a11 = Math.min(this.a11,m.a11); this.a12 = Math.min(this.a12,m.a12); this.a13 = Math.min(this.a13,m.a13);
		this.a21 = Math.min(this.a21,m.a21); this.a22 = Math.min(this.a22,m.a22); this.a23 = Math.min(this.a23,m.a23);
		this.a31 = Math.min(this.a31,m.a31); this.a32 = Math.min(this.a32,m.a32); this.a33 = Math.min(this.a33,m.a33);

		return this;
	},

	Copy: function () {
		return new ENGINE2D.Matrix3().Set(
			this.a11, this.a12, this.a13, 
			this.a21, this.a22, this.a23, 
			this.a31, this.a32, this.a33
		);
	},

	Equals: function (m) {
		return (this.a11 == m.a11) && 
      (this.a12 == m.a12) && 
      (this.a13 == m.a13) && 
      (this.a21 == m.a21) && 
      (this.a22 == m.a22) && 
      (this.a23 == m.a23) && 
      (this.a31 == m.a31) && 
      (this.a32 == m.a32) && 
      (this.a33 == m.a33);
	},

	ZeroEps: function (eps) {
		if ( Math.abs(this.a11) <= eps ) { this.a11=0; }
		if ( Math.abs(this.a12) <= eps ) { this.a12=0; }
		if ( Math.abs(this.a13) <= eps ) { this.a13=0; }
		if ( Math.abs(this.a21) <= eps ) { this.a21=0; }
		if ( Math.abs(this.a22) <= eps ) { this.a22=0; }
		if ( Math.abs(this.a23) <= eps ) { this.a23=0; }
		if ( Math.abs(this.a31) <= eps ) { this.a31=0; }
		if ( Math.abs(this.a32) <= eps ) { this.a32=0; }
		if ( Math.abs(this.a33) <= eps ) { this.a33=0; }

		return this;
	},

	EqualEps: function (m,eps) {
		if ( Math.abs(this.a11-m.a11) <= eps ) { this.a11=m.a11; }
		if ( Math.abs(this.a12-m.a12) <= eps ) { this.a12=m.a12; }
		if ( Math.abs(this.a13-m.a13) <= eps ) { this.a13=m.a13; }
		if ( Math.abs(this.a21-m.a21) <= eps ) { this.a21=m.a21; }
		if ( Math.abs(this.a22-m.a22) <= eps ) { this.a22=m.a22; }
		if ( Math.abs(this.a23-m.a23) <= eps ) { this.a23=m.a23; }
		if ( Math.abs(this.a31-m.a31) <= eps ) { this.a31=m.a31; }
		if ( Math.abs(this.a32-m.a32) <= eps ) { this.a32=m.a32; }
		if ( Math.abs(this.a33-m.a33) <= eps ) { this.a33=m.a33; }

		return this;
	},

	Clamp: function (min, max) {
		this.a11 = this.a11 < min ? min : (this.a11 > max ? max : this.a11 );
		this.a12 = this.a12 < min ? min : (this.a12 > max ? max : this.a12 );
		this.a13 = this.a13 < min ? min : (this.a13 > max ? max : this.a13 );
		this.a21 = this.a21 < min ? min : (this.a21 > max ? max : this.a21 );
		this.a22 = this.a22 < min ? min : (this.a22 > max ? max : this.a22 );
		this.a23 = this.a23 < min ? min : (this.a23 > max ? max : this.a23 );
		this.a31 = this.a31 < min ? min : (this.a31 > max ? max : this.a31 );
		this.a32 = this.a32 < min ? min : (this.a32 > max ? max : this.a32 );
		this.a33 = this.a33 < min ? min : (this.a33 > max ? max : this.a33 );

		return this;
	},

	/*CHECKS*/
	EqualsEps: function (m,eps) {
		return ( Math.abs( this.a11 - m.a11 ) <= eps ) && 
      ( Math.abs( this.a12 - m.a12 ) <= eps ) && 
      ( Math.abs( this.a13 - m.a13 ) <= eps ) && 
      ( Math.abs( this.a21 - m.a21 ) <= eps ) && 
      ( Math.abs( this.a22 - m.a22 ) <= eps ) && 
      ( Math.abs( this.a23 - m.a23 ) <= eps ) && 
      ( Math.abs( this.a31 - m.a31 ) <= eps ) && 
      ( Math.abs( this.a32 - m.a32 ) <= eps ) && 
      ( Math.abs( this.a33 - m.a33 ) <= eps );
	},

	Iszero: function (eps) {
		return ( Math.abs( this.a11 ) <= eps ) && 
      ( Math.abs( this.a12 ) <= eps ) && 
      ( Math.abs( this.a13 ) <= eps ) && 
      ( Math.abs( this.a21 ) <= eps ) && 
      ( Math.abs( this.a22 ) <= eps ) && 
      ( Math.abs( this.a23 ) <= eps ) && 
      ( Math.abs( this.a31 ) <= eps ) && 
      ( Math.abs( this.a32 ) <= eps ) && 
      ( Math.abs( this.a33 ) <= eps );
	}
};