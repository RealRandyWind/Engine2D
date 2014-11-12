ENGINE2D.DynamicObject = function (geometry, material, pysicalVector, position, direction) {
	
	ENGINE2D.StaticObject.call(this, geometry, material, undefined, undefined, position, direction);
	
	this.type = ENGINE2D.OBJECT2DTYPE_DYNAMIC;
	
	this.pysicalVector = pysicalVector;
	this.Reset();
};

ENGINE2D.DynamicObject.prototype = Object.create(ENGINE2D.StaticObject.prototype);

ENGINE2D.DynamicObject.prototype.SetPhysicals = function (pysicalVector) {
	this.pysicalVector = pysicalVector;
	
	return this;
};

ENGINE2D.DynamicObject.prototype.GetPhysicals = function () {
	return this.pysicalVector;
};