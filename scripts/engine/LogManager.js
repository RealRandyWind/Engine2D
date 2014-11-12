ENGINE2D.LogManager = function (url) {
	this.totalMessages = 0;
	this.messageBuffer = {};
	this.url = url;
};

ENGINE2D.LogManager.prototype = {

	constructor: ENGINE2D.LogManager,

	SetUp: function () {
		/* TODO */
		console.log('_SUCCESS: [LogManager.SetUp]');
	},

	ShutDown: function () {
		/* TODO */
		this.Info('totalMessages ' + this.totalMessages);
		this.Flush();
		this.messageBuffer = {};
		console.log('_SUCCESS: [LogManager.ShutDown]');
	},

	Log: function (message) {
		this._Push('Log: ' + message);
	},

	Info: function (message) {
		this._Push('Info: ' + message);
	},

	Success: function (message) {
		this._Push('Success: ' + message);
	},

	Warning: function (message) {
		this._Push('Warning: ' + message);
	},

	Error: function (message) {
		this._Push('Error: ' + message);
	},

	Debug: function (message) {
		this._Push('Debug: ' + message);
	},

	Flush: function () {
		/* TODO MORE write logs to url */
		var oldBuffer = this.messageBuffer;
		this.messageBuffer = {};
		for (var message in oldBuffer) {
			if (oldBuffer.hasOwnProperty(message)) {
				var messageInfo = oldBuffer[message];
				var postFix = ' -- {' + messageInfo.count + ':' + messageInfo.date + '}';
				console.log(message + postFix);
			}
		}
	},

	_Push: function (message) {		
		++this.totalMessages;

		var messageInfo = this.messageBuffer[message];
		
		if (messageInfo === undefined) {
			messageInfo = { count: 0, date: Date.now() };
			this.messageBuffer[message] = messageInfo;
		}

		++messageInfo.count;
		messageInfo.date = Date.now();
	}
};