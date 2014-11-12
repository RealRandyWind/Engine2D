ENGINE2D.BicycleGame = function (configuration, loadingManager, logManager) {
	ENGINE2D.Simulator.call(this, loadingManager, logManager);
	this.configuration = configuration;
};

ENGINE2D.BicycleGame.prototype = Object.create(ENGINE2D.Simulator.prototype);

ENGINE2D.BicycleGame.prototype.BeforeSetUp = function () {
	/*STUB START*/
	this.game.AddLoader('image',new ENGINE2D.ImageLoader(this.loadingManager,this.logManager));
	
	/*STUB END*/
	this.logManager.Success('[BicycleGame.BeforeSetUp]');
};

ENGINE2D.BicycleGame.prototype.OnSetUp = function () {	
	/*STUB START*/
	var keyMap = {};
	keyMap[ENGINE2D.STATE_W] = 'cycle';
	keyMap[ENGINE2D.STATE_S] = 'break';
	keyMap[ENGINE2D.STATE_A] = 'moveleft';
	keyMap[ENGINE2D.STATE_D] = 'moveright';
	keyMap[ENGINE2D.STATE_MOUSE] = 'steer';
	var control = new ENGINE2D.ControlKeyboardMouse(this.container, this.logManager);
	control.SetKeyMap(keyMap);
	this.game.AddControl('keyboardmouse',control);

	var gw = 6462; var gh = 5306;
	var ox = gw/2 - 3610; var oy = gh/2 - 3730;

	var gameState = new ENGINE2D.GameState(0);
	var imageLoader = this.game.GetLoader('image');
	var camera = new ENGINE2D.Camera(new ENGINE2D.Vector2(0.0, 0.0), new ENGINE2D.Vector2(0.0, 1.0)).UpdateMatrix();
	var scene = new ENGINE2D.Scene(this.logManager);

	var prmsImage = imageLoader.Load('media/maps/routeA-textured-01.jpg');

	var geometry = new ENGINE2D.Geometry([{x: -gw/2, y: -gh/2}, {x: gw/2, y: -gh/2}, {x: gw/2, y: gh/2}, {x: -gw/2, y: gh/2}]);
	var material = new ENGINE2D.Material(prmsImage.data, 0, new ENGINE2D.Vector2(gw, gh), false);
	var staticObject = new ENGINE2D.StaticObject(
		geometry,
		material,
		new ENGINE2D.Vector2(0.0, 0.0),
		new ENGINE2D.Vector2(0.0, 1.0)
	).UpdateMatrix();

	var staticObject2 = new ENGINE2D.StaticObject(
		new ENGINE2D.Geometry([{x: 0.0, y: -16.0}, {x: 4.0, y: 16.0}, {x: -4.0, y: 16.0}]),
		new ENGINE2D.Material(undefined, 0, new ENGINE2D.Vector2(16, 32), false),
		new ENGINE2D.Vector2(-ox, -oy),
		new ENGINE2D.Vector2(0.0, 1.0)
	).UpdateMatrix();

	//camera.Zoom(2.0);
	camera.SetParent(staticObject2);
	staticObject2.AddChild(camera);

	this.game.AddScene(scene);
	this.game.AddCamera(camera);
	
	scene.Add(staticObject2);
	scene.Add(staticObject);
	scene.Add(camera);

	gameState.SetCamera(camera);
	gameState.SetScene(scene);
	gameState.SetControl(control);
	this.game.SetGameState(gameState);

	/*imageLoader.Load()*/
	/*STUB END*/
	this.logManager.Success('[BicycleGame.OnSetUp]');
};

ENGINE2D.BicycleGame.prototype.OnShutDown = function () {
	/*INTERFACE*/
	this.logManager.Success('[BicycleGame.OnShutDown]');
};

ENGINE2D.BicycleGame.prototype.OnInterpolate = function (alpha) {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.OnInterpolate]');*/
};

ENGINE2D.BicycleGame.prototype.OnSimulate = function (t, dt) {
	/*STUB START*/
	var control = this.game.gameState.control;
	var scene = this.game.gameState.scene;
	var camera = scene.Get(ENGINE2D.OBJECT2DTYPE_CAMERA,0);
	var object = camera.GetParent();
	//var newPosition = new ENGINE2D.Vector2().Assign(object.position);
	//object.TranslateOn(object.direction,control.GetState('cycle').state);
	camera.MoveTo(object.position);
	camera.UpdateMatrix();
	/*STUB END*/
	/*
	this.EvaluateInput();
	this.EvaluateGameLogics();
	this.UpdateGameWorld();
	this.UpdateCameras();
	this.UpdateGameState();
	*/
},

ENGINE2D.BicycleGame.prototype.EvaluateInput = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.EvaluateInput]');*/
};

ENGINE2D.BicycleGame.prototype.EvaluateGameLogics = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.EvaluateGameLogics]');*/
};

ENGINE2D.BicycleGame.prototype.UpdateGameWorld = function () {
	/*INTERFACE*/	
	/*this.logManager.Debug('[BicycleGame.UpdateGameWorld]');*/
};

ENGINE2D.BicycleGame.prototype.UpdateCameras = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.UpdateCameras]');*/
};

ENGINE2D.BicycleGame.prototype.UpdateGameState = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.UpdateGameState]');*/
};