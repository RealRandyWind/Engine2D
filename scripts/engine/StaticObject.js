ENGINE2D.StaticObject = function (geometry, material, position, direction) {
	
	ENGINE2D.Trigger.call(this, geometry, undefined, undefined, position, direction);
	
	this.type = ENGINE2D.OBJECT2DTYPE_STATIC;
	this.isRenderable = true;
	this.isVisible = true;
	
	this.material = material;
	this.state = 0;
	this.stateTime = 0.0;
};

ENGINE2D.StaticObject.prototype = Object.create(ENGINE2D.Trigger.prototype);

ENGINE2D.StaticObject.prototype.Reset = function () {
	this.state = 0;
	this.stateTime = 0.0;
	
	return this;
};

ENGINE2D.StaticObject.prototype.GetState = function () {
	return this.state;
};

ENGINE2D.StaticObject.prototype.GetTimeState = function () {
	return this.timeState;
};

ENGINE2D.StaticObject.prototype.SetState = function (state) {
	this.state = state;
	
	return this;
};

ENGINE2D.StaticObject.prototype.SetTimeState = function (timeState) {
	this.timeState = timeState;
	
	return this;
};

ENGINE2D.StaticObject.prototype.SetVisible = function (isVisible) {
	this.isVisible = isVisible;
	
	return this;
};