ENGINE2D.Boundary = function (geometry, position, direction) {
	
	ENGINE2D.Empty.call(this, position, direction);
	
	this.type = ENGINE2D.OBJECT2DTYPE_BOUNDARY;
	
	this.geometry = geometry;
};

ENGINE2D.Boundary.prototype = Object.create(ENGINE2D.Empty.prototype);

ENGINE2D.Boundary.prototype.IsInbound = function (point) {
	return this.geometry.IsInbound(point);
};

ENGINE2D.Boundary.prototype.Intersect = function (point, direction) {
	return this.geometry.Intersect(point, direction);
};