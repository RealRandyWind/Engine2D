ENGINE2D.InputState = function () {
	this.type = -1;
	this.state = 0;
	this.event = undefined;
	this.position = new ENGINE2D.Vector2(0.0, 0.0);
	this.position.isDefined = false;
	this.previous = undefined;
	this.next = undefined;
	this.length = 1;
};

ENGINE2D.InputState.prototype = {

	constructor: ENGINE2D.InputState,

	Update: function (type, state, event, x, y) {
		this.type = type;
		this.state = state;
		this.event = event;
		
		this.UpdatePosition(x, y);

		return this;
	},

	GetNext: function () {
		return this.next;
	},

	GetPrevious: function () {
		return this.previous;
	},

	GetState: function () {
		return this.state;
	},

	GetEvent: function () {
		return this.event;
	},

	UpdatePosition: function (x, y) {
		this.position.isDefined = (x !== undefined) && (y !== undefined);

		if (this.position.isDefined) {
			this.position.x = x;
			this.position.y = y;
		}
	},

	SetNext: function (inputState) {
		this.next = inputState;

		return this;
	},

	SetPrevious: function (inputState) {
		this.previous = inputState;

		return this;
	},

	Copy: function () {
		return new ENGINE2D.InputState().Update(this.type, this.state, this.event, this.position.x, this.position.y);
	}
};