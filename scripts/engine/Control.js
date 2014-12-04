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
			var inputState = new ENGINE2D.InputState();
			inputState.last = undefined;
			this.states[action] = inputState;
			
			return this;
		}

		this.logManager.Warning('[Control.AddState] state already present');
		return this;
	},

	SetTrace: function (action, traceCount) {
		var inputState = this.states[action];
		inputState.length = traceCount + 1;
		
		for (var i = traceCount - 1; i >= 0; i--) {
			inputState.previous = new ENGINE2D.InputState();
			inputState.previous.next = inputState;
			inputState = inputState.previous;
		}

		this.states[action].last = inputState;
	},

	Trace: function (action) {
		var inputState = this.states[action];
		if(inputState === undefined ) {
			this.logManager.Warning('[Control.Trace] state not present');
			return this;
		}
		
		if (inputState.length <= 1) {
			return this;
		}

		var last = inputState.last;

		if (inputState.length > 2) {
			

			inputState.last = last.next;
			last.next.previous = undefined;
			last.next = inputState;
			last.previous = inputState.previous;
			inputState.previous = last;
		}
		
		last.Update(inputState.type, inputState.state, inputState.event, inputState.position.x, inputState.position.y);

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