ENGINE2D.Empty = function (position, direction) {
	
	ENGINE2D.Object2D.call(this);
	
	this.type = ENGINE2D.OBJECT2DTYPE_EMPTY;

	this.LookAt(direction);
	this.MoveTo(position);
};

ENGINE2D.Empty.prototype = Object.create(ENGINE2D.Object2D.prototype);