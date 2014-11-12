ENGINE2D.LoadingManager = function (logManager) {
	this.logManager = logManager;
	this.loadedItems = 0;
	this.totalItems = 0;
	this.isReady = true;
};

ENGINE2D.LoadingManager.prototype = {

	constructor: ENGINE2D.LoadingManager,

	SetUp: function () {
		/* TODO */
		this.logManager.Success('[LoadingManager.SetUp]');
	},

	ShutDown: function () {
		/* TODO */
		this.logManager.Success('[LoadingManager.ShutDown]');
	},

	ItemStart: function (url) {
		++this.totalItems;
		this.isReady = false;
	},

	ItemEnd: function (url) {
		++this.loadedItems;

		this.OnProgress(url, this.loadedItems, this.totalItems);

		if (this.loadedItems === this.totalItems) {
			this.OnLoad();
			this.isReady = true;
		}
	},

	Reset: function () {
		this.loadedItems = 0;
		this.totalItems = 0;
	},

	OnProgress: function (item, loaded, total) {
		/*INTERFACE*/
		this.logManager.Info('[LoadingManager.OnProgress] item "' + item + '" ' + loaded + '/' + total + '.');
	},

	OnLoad: function () {
		/*INTERFACE*/
		this.logManager.Info('[LoadingManager.OnLoad] items done');
	},

	OnError: function (errorEvent) {
		/*INTERFACE*/
		this.logManager.Error('[LoadingManager.OnError] ' + errorEvent.message);
	}
};