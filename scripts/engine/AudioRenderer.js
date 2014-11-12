ENGINE2D.AudioRenderer = function (logManager) {
	this.logManager = logManager;
	this.volume = 1.0;
	this.audio = undefined;
	this.container = undefined;

	/* TODO */
	console.error('_ERROR: [AudioRenderer.AudioRenderer] function not yet implemented');
};

ENGINE2D.AudioRenderer.prototype = {

	constructor: ENGINE2D.AudioRenderer,

	SetVolume: function (volume) {
		this.volume = volume;
	},

	SetUp: function () {
		/* TODO */
		console.error('_ERROR: [AudioRenderer.SetUp] function not yet implemented');
	},

	ShutDown: function () {
		/*TODO MORE*/
		this.logManager.Success('[AudioRenderer.ShutDown]');
	},

	/*TODO Maybe pass interval object*/
	Render: function (scene,camera) {
		/* TODO */
		console.error('_ERROR: [AudioRenderer.Render] function not yet implemented');
	},

	AddAudioTo: function (container) {
		container.appendChild(this.canvas);
	},

	RemoveAudioFrom: function (container) {
		container.removeChild(this.canvas);
	},

	_BlendAudios: function (scene, camera) {
		/* TODO */
		console.error('_ERROR: [AudioRenderer._BlendAudios] function not yet implemented');
	},

	_PlayAudio: function (object, viewMatrix) {
		/* TODO */
		console.error('_ERROR: [AudioRenderer._PlayAudio] function not yet implemented');
	}
};