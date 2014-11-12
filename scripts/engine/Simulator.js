ENGINE2D.Simulator = function (loadingManager, logManager) {
	this.logManager = logManager;
	this.loadingManager = loadingManager;

	this.container = undefined;
	this.isFixedSize = false;

	this.game = undefined;
	this.messageQueue = undefined;
	this.renderer = undefined;
};

ENGINE2D.Simulator.prototype = {

	constructor: ENGINE2D.Simulator,

	BeforeSetUp: function () {
		/*INTERFACE*/
		console.error('_ERROR: [Simulator.BefourSetUp] function not yet implemented');
	},

	OnSetUp: function () {
		/*INTERFACE*/
		console.error('_ERROR: [Simulator.OnSetUp] function not yet implemented');
	},

	OnShutDown: function () {
		/*INTERFACE*/
		console.error('_ERROR: [Simulator.OnShutDown] function not yet implemented');
	},

	OnInterpolate: function (alpha) {
		/*INTERFACE*/
		console.error('_ERROR: [Simulator.OnInterpolate] function not yet implemented');
	},

	OnDisplay: function () {
		var gameState = this.game.GetGameState();
		this.renderer.Render(gameState.GetScene(), gameState.GetCamera());
		/*audio not yet implemented souds have to be blended togeter and played*/
		/*this.audioRenderer.Render(gameState.GetScene(), gameState.GetCamera())*/
	},

	OnResize: function () {
		if (this.isFixedSize) { return; }
		this.renderer.SetDisplaySize(window.innerWidth,window.innerHeight);
	},

	SetUp: function () {
		/*TODO MORE*/
		if (this.game === undefined) {
			this.logManager.Error('[Simulator.SetUp] game is not set yet.');
			return;
		}

		this.loadingManager.ItemStart();
		this.container = document.createElement('div');
		this.renderer.AddCanvasTo(this.container);
		
		window.addEventListener('resize', this.OnResize.bind(this), false ); 
		this.OnResize();

		this.container.addEventListener('contextmenu', function (event) { event.preventDefault(); }, false);
		document.body.appendChild(this.container);

		this.OnSetUp();

		this.loadingManager.ItemEnd('Simulator.SetUp');
		this.logManager.Success('[Simulator.SetUp]');
	},

	ShutDown: function () {
		/*TODO MORE*/
		this.loadingManager.ItemStart();
		
		this.OnShutDown();

		this.loadingManager.ItemEnd('Simulator.ShutDown');
		this.logManager.Success('[Simulator.ShutDown]');
	},

	SetGame: function (game) {
		this.game = game;

		this.messageQueue = game.GetMessageQueue();
		this.renderer = game.GetRenderer();

		return this;
	},

	SetFixedSize: function (isFixedSize) {
		this.isFixedSize = isFixedSize;
	},

	OnSimulate: function (t, dt) {
		/*INTERFACE*/
		console.error('_ERROR: [Simulator.OnSimulate] function not yet implemented');
	},

	GetRenderer: function () {
		return this.renderer;
	},

	GetGame: function () {
		return this.game;
	},

	GetMessageQueue: function () {
		return this.messageQueue;
	}
};