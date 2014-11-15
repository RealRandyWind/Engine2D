ENGINE2D.Game = function (interval, renderer, simulator, logManager, loadingManager) {
	this.logManager = logManager;
	this.loadingManager = loadingManager;

	this.intervalId = undefined;
	this.isInterupted = false;
	this.isInitialized = false;
	this.isStopped = false;
	this.isRunning = false;

	this.loaders = {};
	this.interval = interval;
	this.renderer = renderer;
	this.scenes = [];
	this.geometrys = [];
	this.materials = [];
	this.audios = [];
	this.transitions = [];
	this.evolutions = [];
	this.conditions = [];
	this.objects = []; /*consider adding objects here as well for transition purposes*/
	this.cameras = [];
	this.controls = {};
	this.gameState = undefined;
	this.simulator = simulator;
	this.messageQueue = new ENGINE2D.MessageQueue();
};

ENGINE2D.Game.prototype = {

	constructor: ENGINE2D.Game,

	SetUp: function () {
		/* TODO MORE */
		if (this.isInitialized) {
			this.logManager.Warning('[Game.SetUp] already initialized.');
			return;
		}

		this.logManager.SetUp();
		this.loadingManager.SetUp();
		
		this.loadingManager.Reset();
		this.loadingManager.ItemStart();
		
		this.renderer.SetUp();

		this.simulator.SetGame(this);
		this.simulator.BeforeSetUp();
		
		for (var key in this.loaders) {
			if (this.loaders.hasOwnProperty(key)) {
				this.loaders[key].SetUp();
			}
		}

		this.simulator.SetUp();

		for (var key in this.controls) {
			if (this.controls.hasOwnProperty(key)) {
				this.controls[key].SetUp();
			}
		}
		
		this.loadingManager.ItemEnd('Game.SetUp');

		this.isInitialized = true;
		this.logManager.Success('[Game.SetUp]');
	},

	ShutDown: function () {	
		if (!this.isInitialized) {
			this.logManager.Warning('[Game.ShutDown] already shutdown.');
			return;
		}

		if (this.isRunning) {
			this.logManager.Warning('[Game.ShutDown] still running, interupting now.');
			this.Interupt();
			return;
		}

		this.isInitialized = false;
		this.logManager.Log('[Game.MainLoop] shutting down.');
		
		this.loadingManager.Reset();
		this.loadingManager.ItemStart();

		for (var key in this.controls) {
			if (this.controls.hasOwnProperty(key)) {
				this.controls[key].ShutDown();
			}
		}

		this.simulator.ShutDown();
		
		for (var key in this.loaders) {
			if (this.loaders.hasOwnProperty(key)) {
				this.loaders[key].ShutDown();
			}
		}

		this.renderer.ShutDown();

		this.loadingManager.ItemEnd('Game.ShutDown');
		this.loadingManager.ShutDown();
		this.logManager.ShutDown();

		this.isInterupted = false;
		console.log('_SUCCESS: [Game.ShutDown]');
	},

	MainLoop: function () {
		this.intervalId = window.requestAnimationFrame(this.MainLoop.bind(this));

		if (!this.isInitialized){
			console.error('_ERROR: [Game.MainLoop] not yet initialized.');
			window.cancelAnimationFrame(this.intervalId);
			this.isRunning = false;
			return; 
		}

		if (this.isStopped) {
			window.cancelAnimationFrame(this.intervalId);
			this.isRunning = false;
			if (this.isInterupted)  {
				this.logManager.Log('[Game.MainLoop] being interupted.');
				this.ShutDown(); 
			} else {
				this.logManager.Log('[Game.MainLoop] being stopped.');
			}
			return;
		}
		
		this.interval.Frame(this.simulator);
	},

	Start: function () {
		if (this.isRunning) {
			this.logManager.Warning('[Game.Start] already running.');
			return this;
		}

		this.isInterupted = false;
		this.isStopped = false;
		this.logManager.Log('[Game.Start] entering main loop.');
		this.intervalId = window.requestAnimationFrame(this.MainLoop.bind(this));
		this.isRunning = true;
		return this;
	},

	Stop: function () {
		if (!this.isRunning) {
			this.logManager.Warning('[Game.Stop] already not running.');
			return this; 
		}

		this.isStopped = true;
		return this;
	},

	Interupt: function () {
		if (!this.isRunning) {
			console.warn('_Warning: [Game.Interupt] already not running.');
			return this; 
		}

		this.isInterupted = true;
		this.isStopped = true;
		return this;
	},

	GetSimulator: function () {
		return this.simulator;
	},

	GetRenderer: function () {
		return this.renderer;
	},

	GetMessageQueue: function () {
		return this.messageQueue;
	},

	SetGameState: function (gameState) {
		this.gameState = gameState;

		return this;
	},

	GetGameState: function () {
		return this.gameState;
	},

	AddLoader: function (key, loader) {
		this.loaders[key] = loader;

		return key;
	},

	RemoveLoader: function (key) {
		delete this.loaders[key];

		return this;
	},

	GetLoader: function (key) {
		return this.loaders[key];
	},

	AddAudio: function (audio) {
		audio.uid = this.audios.length;
		this.audios.push(audio);

		return audio.uid;
	},

	GetAudio: function (key) {
		return this.audios[key];
	},

	AddScene: function (scene) {
		scene.uid = this.scenes.length;
		this.scenes.push(scene);

		return scene.uid;
	},

	GetScene: function (key) {
		return this.scenes[key];
	},

	AddGeometry: function (geometry) {
		geometry.uid = this.geometrys.length;
		this.geometrys.push(geometry);

		return geometry.uid;
	},

	GetGeometry: function (key) {
		return this.geometrys[key];
	},

	AddMaterial: function (material) {
		material.uid = this.materials.length;
		this.materials.push(material);

		return material.uid;
	},

	GetMaterial: function (key) {
		return this.materials[key];
	},

	AddObject: function (object) {
		object.uid = this.objects.length;
		this.objects.push(object);

		return object.uid;
	},

	GetObject: function (key) {
		return this.objects[key];
	},

	AddTransition: function (transition) {
		transition.uid = this.transitions.length;
		this.transitions.push(transition);

		return transition.uid;
	},

	GetTransition: function (key) {
		return this.transitions[key];
	},

	AddEvolution: function (evolution) {
		evolution.uid = this.evolutions.length;
		this.evolutions.push(evolution);

		return evolution.uid;
	},

	GetEvolution: function (key) {
		return this.evolutions[key];
	},

	AddCondition: function (condition) {
		condition.uid = this.conditions.length;
		this.conditions.push(condition);

		return condition.uid;
	},

	GetCondition: function (key) {
		return this.conditions[key];
	},

	AddCamera: function (camera) {
		camera.uid = this.cameras.length;
		this.cameras.push(camera);

		return camera.uid;
	},

	GetCamera: function (key) {
		return this.cameras[key];
	},

	AddControl: function (key, control) {
		this.controls[key] = control;

		return key;
	},

	GetControl: function (key) {
		return this.controls[key];
	}
};