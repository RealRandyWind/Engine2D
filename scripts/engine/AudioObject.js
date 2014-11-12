ENGINE2D.AudioObject = function (audio, position, direction) {
	
	ENGINE2D.Empty.call(this, position, direction);
	
	this.type = ENGINE2D.OBJECT2DTYPE_AUDIO;
	
	this.audio = audio;
	this.Reset();
};

ENGINE2D.AudioObject.prototype = Object.create(ENGINE2D.Empty.prototype);

ENGINE2D.AudioObject.prototype.Reset = function () {
	this.state = 0;
	this.stateTime = 0.0;
	
	return this;
};

ENGINE2D.AudioObject.prototype.GetState = function () {
	return this.state;
};

ENGINE2D.AudioObject.prototype.GetTimeState = function () {
	return this.timeState;
};

ENGINE2D.AudioObject.prototype.SetState = function (state) {
	this.state = state;
	
	return this;
};

ENGINE2D.AudioObject.prototype.SetTimeState = function (timeState) {
	this.timeState = timeState;
	
	return this;
};