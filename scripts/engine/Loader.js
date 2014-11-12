ENGINE2D.Loader = function (loadingManager, logManager) {
	this.logManager = logManager;
	this.loadingManager = loadingManager;

	this.cache = new ENGINE2D.Cache();
};

ENGINE2D.Loader.prototype = {

	constructor: ENGINE2D.Loader,

	SetUp: function () {
		/*INTERFACE*/
		this.logManager.Success('[Loader.SetUp]');
	},

	ShutDown: function () {
		/*INTERFACE*/
		this.logManager.Success('[Loader.ShutDown]');
	},

	Load: function (url) {
		/*INTERFACE*/
		console.error('_ERROR: [Loader.Load] function not yet implemented');
	}
};