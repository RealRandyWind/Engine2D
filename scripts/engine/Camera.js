ENGINE2D.Camera = function (position, direction) {

	ENGINE2D.Empty.call(this,position,direction);

	this.type = ENGINE2D.OBJECT2DTYPE_CAMERA;

	this.zoom = 1.0;
	this.SetAspect(ENGINE2D.DEFAULT_RENDERWIDTH / ENGINE2D.DEFAULT_RENDERHEIGHT);
};

ENGINE2D.Camera.prototype = Object.create(ENGINE2D.Empty.prototype);

ENGINE2D.Camera.prototype.SetAspect = function (aspect) {
	this.aspect = aspect;
};

ENGINE2D.Camera.prototype.Zoom = function (alpha) {
	/* TODO Not jet correct*/
	this.zoom *= alpha;
};

ENGINE2D.Camera.prototype.GetViewMatrix = function () {
	return this.GetModelMatrix();
};