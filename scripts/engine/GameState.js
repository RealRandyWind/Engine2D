ENGINE2D.GameState = function (seed) {
	this.camera = undefined;
	this.control = undefined;
	this.scene = undefined;
	this.seed = seed;
	this.flag = 0;
	this.settings = {};
};

ENGINE2D.GameState.prototype = {

	constructor: ENGINE2D.GameState,

	Set: function (setting,value) {
		this.settings[setting] = value;
		return this;
	},

	UnSet: function (setting) {
		delete this.settings[setting];
		return this;
	},

	Get: function (setting) {
		return this.settings[setting];
	},

	SetScene: function (scene) {
		this.scene = scene;

		return this;
	},

	GetScene: function () {
		return this.scene;
	},

	SetCamera: function (camera) {
		this.camera = camera;

		return this;
	},

	GetCamera: function () {
		return this.camera;
	},

	SetControl: function (control) {
		this.control = control;

		return this;
	},

	GetControl: function () {
		return this.control;
	},

	SetFlag: function (flag) {
		this.flag = flag;

		return this;
	},

	GetFlag: function () {
		return this.flag;
	},

	GetSeed: function () {
		return this.seed;
	}
};