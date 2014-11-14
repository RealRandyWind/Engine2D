ENGINE2D.Control = function (container, logManager) {
	this.logManager = logManager;
	this.container = container;

	this.states = {};
};

ENGINE2D.Control.prototype = {

	constructor: ENGINE2D.Control,

	SetUp: function () {
		/*INTERFACE*/
		console.error('_ERROR: [Control.SetUp] function not yet implemented');
	},

	ShutDown: function () {
		/*INTERFACE*/
		console.error('_ERROR: [Control.ShutDown] function not yet implemented');
	},

	Clear: function () {
		this.states = {};

		return this;
	},

	Update: function (action, state, event, previous, next) {
		var inputState = this.states[action];
		if(inputState === undefined ) {
			this.logManager.Warning('[Control.Update] state not present');
			return this;
		}

		inputState.Update(state, event, previous, next);

		return this;
	},

	AddState: function (action) {
		if(this.states[action] === undefined ) {
			this.states[action] = new ENGINE2D.InputState();
			return this;
		}

		this.logManager.Warning('[Control.AddState] state already present');
		return this;
	},

	RemoveState: function (action) {
		if(this.states[action] === undefined ) {
			this.logManager.Warning('[Control.RemoveState] state already not present');
			return this;
		}

		delete this.states[action];
		
		return this;
	},

	GetState: function (action) {
		var inputState = this.states[action];
		if(inputState === undefined ) {
			this.logManager.Warning('[Control.GetState] state not present');
		}

		return inputState;
	}

};