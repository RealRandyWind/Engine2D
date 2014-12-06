ENGINE2D.Empty = function (position, direction) {
	
	ENGINE2D.Object2D.call(this);
	
	this.type = ENGINE2D.OBJECT2DTYPE_EMPTY;
	
	this.Rotate(this.direction.Angle(direction.Normalize()));
	this.MoveTo(position);
};

ENGINE2D.Empty.prototype = Object.create(ENGINE2D.Object2D.prototype);

ENGINE2D.Empty.prototype.Intersection = function (point, direction) {	
	if (direction.Dot(this.direction) === 0) {
		return undefined;
	}

	var alphas = new ENGINE2D.Vector2(0.0,0.0);

	console.error('_ERROR: [Geometry.Intersection] function not yet implemented');

	return alphas;
};