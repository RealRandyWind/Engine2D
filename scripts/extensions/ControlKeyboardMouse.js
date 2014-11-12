ENGINE2D.ControlKeyboardMouse = function (container, logManager) {
	ENGINE2D.Control.call(this, container, logManager);
	this.keyMap = {};
};

ENGINE2D.ControlKeyboardMouse.prototype = Object.create(ENGINE2D.Control.prototype);

ENGINE2D.ControlKeyboardMouse.prototype.SetKeyMap = function (keyMap) {
	this.keyMap = keyMap;
	for ( var key in keyMap ) {
		if (keyMap.hasOwnProperty(key)) {
			var action = keyMap[key];
			if (action === undefined) { return; }
			this.states[action] = new ENGINE2D.InputState();
		}
	}
};

ENGINE2D.ControlKeyboardMouse.prototype.SetUp = function () {
	/*INTERFACE*/

	window.addEventListener('keydown', this.OnKeyDown.bind(this), false );
	window.addEventListener('keyup', this.OnKeyUp.bind(this), false );
	window.addEventListener('scroll', this.OnScroll.bind(this), false );
	this.container.addEventListener('mousedown', this.OnMouseDown.bind(this), false );
	this.container.addEventListener('mouseup', this.OnMouseUp.bind(this), false );
	this.container.addEventListener('mousemove', this.OnMouseMove.bind(this), false );

	this.logManager.Success('[ControlKeyboardMouse.SetUp]');
};

ENGINE2D.ControlKeyboardMouse.prototype.ShutDown = function () {
	/*INTERFACE*/
	console.error('_ERROR: [ControlKeyboardMouse.ShutDown] function not yet implemented');
};

ENGINE2D.ControlKeyboardMouse.prototype.OnKeyDown = function (event) {
	var action = this.keyMap[event.keyCode];
	if (action === undefined) { return; }
	var inputState = this.states[action];
	inputState.type = ENGINE2D.INPUTTYPE_KEY;
	inputState.state = ENGINE2D.INPUTSTATE_ACTIVE;
	inputState.event = event;
};

ENGINE2D.ControlKeyboardMouse.prototype.OnKeyUp = function (event) {
	var action = this.keyMap[event.keyCode];
	if (action === undefined) { return; }
	var inputState = this.states[action];
	inputState.type = ENGINE2D.INPUTTYPE_KEY;
	inputState.state = ENGINE2D.INPUTSTATE_INACTIVE;
	inputState.event = event;
};

ENGINE2D.ControlKeyboardMouse.prototype.OnMouseDown = function (event) {
	this._OnMouse(ENGINE2D.INPUTSTATE_ACTIVE,event);
};

ENGINE2D.ControlKeyboardMouse.prototype.OnMouseUp = function (event) {
	this._OnMouse(ENGINE2D.INPUTSTATE_INACTIVE,event);
};

ENGINE2D.ControlKeyboardMouse.prototype._OnMouse = function (state, event) {
	var action = undefined;
	
	switch (event.which) {
		case ENGINE2D.CONTROL_MOUSELEFT: {
			action = this.keyMap[ENGINE2D.STATE_LEFTMOUSE];
		} break;
		case ENGINE2D.CONTROL_MOUSEMIDDLE: {
			action = this.keyMap[ENGINE2D.STATE_MIDDLEMOUSE];
		} break;
		case ENGINE2D.CONTROL_MOUSERIGHT: {
			action = this.keyMap[ENGINE2D.STATE_RIGHTMOUSE];
		} break;
		default: {
			action = this.keyMap[ENGINE2D.STATE_OTHERMOUSE];
		}
	}

	if (action === undefined) { return; }
	var inputState = this.states[action];
	inputState.type = ENGINE2D.INPUTTYPE_MOUSE;
	inputState.state = state;
	inputState.event = event;
};

ENGINE2D.ControlKeyboardMouse.prototype.OnMouseMove = function (event) {
	var action = this.keyMap[ENGINE2D.STATE_MOUSEMOVE];
	if (action === undefined) { return; }
	this.states[action].event = event;
};

ENGINE2D.ControlKeyboardMouse.prototype.OnScroll = function (event) {
	var action = this.keyMap[ENGINE2D.STATE_SCROLL];
	if (action === undefined) { return; }
	this.states[action].event = event;
};