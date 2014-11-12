ENGINE2D.Trigger = function (geometry, transition, condition, position, direction) {
	
	ENGINE2D.Boundary.call(this, geometry, position, direction);
	
	this.type = ENGINE2D.OBJECT2DTYPE_TRIGGER;
	
	this.transition = transition;
	this.condition = condition;
};

ENGINE2D.Trigger.prototype = Object.create(ENGINE2D.Boundary.prototype);

ENGINE2D.Trigger.prototype.Trigger = function (game, gameState, object) {
	if (!this.condition.Validate(gameState, object)) { return this; }
	
	this.transition.Call(game,object);
	
	return this;
};

ENGINE2D.Trigger.prototype.SetTransition = function (transition) {
	this.transition = transition;
	
	return this;
};

ENGINE2D.Trigger.prototype.SetCondition = function (condition) {
	this.condition = condition;
	
	return this;
};