ENGINE2D.InteractingObject = function (geometry, material, featureVector, evolution, position, direction) {
	
	ENGINE2D.DynamicObject.call(this, geometry, material, undefined, undefined, undefined, position, direction);
	
	this.type = ENGINE2D.OBJECT2DTYPE_INTERACTING;
	
	this.evolution = evolution;
	this.featureVector = featureVector;
};

ENGINE2D.InteractingObject.prototype = Object.create(ENGINE2D.DynamicObject.prototype);

ENGINE2D.InteractingObject.prototype.Interact = function (scene) {
	this.evolution.Evolve(scene, this);
	
	return this;
};

ENGINE2D.InteractingObject.prototype.SetFeatures = function (featureVector) {
	this.featureVector = featureVector;
	
	return this;
};

ENGINE2D.InteractingObject.prototype.SetEvolution = function (evolution) {
	this.evolution = evolution;
	
	return this;
};

ENGINE2D.InteractingObject.prototype.GetFeatures = function () {
	return this.featureVector;
};