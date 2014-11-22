BicycleGame = function (configuration, loadingManager, logManager) {
	ENGINE2D.Simulator.call(this, loadingManager, logManager);
	this.configuration = configuration;
};

BicycleGame.prototype = Object.create(ENGINE2D.Simulator.prototype);

BicycleGame.prototype.BeforeSetUp = function () {
	/*STUB START*/
	this.game.AddLoader('image',new ENGINE2D.ImageLoader(this.loadingManager,this.logManager));
	
	/*STUB END*/
	this.logManager.Success('[BicycleGame.BeforeSetUp]');
};

BicycleGame.prototype.OnSetUp = function () {	
	/*STUB START*/
	var keyMap = {};
	keyMap[ENGINE2D.STATE_W] = 'cycle';
	keyMap[ENGINE2D.STATE_S] = 'moveback';
	keyMap[ENGINE2D.STATE_A] = 'moveleft';
	keyMap[ENGINE2D.STATE_D] = 'moveright';
	keyMap[ENGINE2D.STATE_SPACE] = 'break';
	keyMap[ENGINE2D.STATE_MOUSEMOVE] = 'steer';
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
		new ENGINE2D.Geometry([{x: 0.0, y: 16.0}, {x: 4.0, y: -16.0}, {x: -4.0, y: -16.0}]),
		new ENGINE2D.Material(undefined, 0, new ENGINE2D.Vector2(16, 32), false),
		new ENGINE2D.Vector2(-ox, -oy),
		new ENGINE2D.Vector2(0.0, 1.0)
	).UpdateMatrix();

	/*camera.Zoom(2.0);*/
	staticObject2.AddChild(camera);

	this.game.AddScene(scene);
	this.game.AddCamera(camera);
	this.game.AddObject(staticObject);
	this.game.AddObject(staticObject2);
	
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

BicycleGame.prototype.OnShutDown = function () {
	/*INTERFACE*/
	this.logManager.Success('[BicycleGame.OnShutDown]');
};

BicycleGame.prototype.OnInterpolate = function (alpha) {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.OnInterpolate]');*/
};

BicycleGame.prototype.OnSimulate = function (t, dt) {
	/*STUB START*/
	var control = this.game.gameState.control;
	var scene = this.game.gameState.scene;
	var camera = scene.Get(ENGINE2D.OBJECT2DTYPE_CAMERA,0);
	var object = camera.GetParent();
	
	var inputCycle = control.GetState('cycle');
	var inputMoveBack = control.GetState('moveback');
	var inputMoveLeft = control.GetState('moveleft');
	var inputMoveRight = control.GetState('moveright');
	var inputSteer = control.GetState('steer');
	
	inputSteer.SetPrevious(inputSteer.Copy());
	inputSteer.previous.SetNext(inputSteer).SetPrevious(undefined);
	var rightHand = object.direction.Copy().Perpendicular();

	/* use mouse point and look at the point in world coordinates
	var point = new ENGINE2D.Vector2(inputSteer.event.clientX, inputSteer.event.clientY);
	// do magick with mousePoint and LookAt or Rotate
	object.Rotate(alpha);
	object.LookAt(point);
	// Note we have to update child objects.
	*/

	var inputSteerLast = inputSteer.previous;
	if (inputSteerLast.position.isDefined) {
		var theta = 0.0;
		var point1 = new ENGINE2D.Vector2(inputSteerLast.position.x, inputSteerLast.position.y);
		var point2 = new ENGINE2D.Vector2(inputSteer.position.x, inputSteerLast.position.y);
		object.Rotate(theta);
		camera.Rotate(theta);
	}

	object.MoveOn(object.direction, inputCycle.state -  inputMoveBack.state);
	object.MoveOn(rightHand, inputMoveRight.state - inputMoveLeft.state);

	object.UpdateMatrix();

	/*move ments are still inverted*/
	
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
};

BicycleGame.prototype.EvaluateInput = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.EvaluateInput]');*/
};

BicycleGame.prototype.EvaluateGameLogics = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.EvaluateGameLogics]');*/
};

BicycleGame.prototype.UpdateGameWorld = function () {
	/*INTERFACE*/	
	/*this.logManager.Debug('[BicycleGame.UpdateGameWorld]');*/
};

BicycleGame.prototype.UpdateCameras = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.UpdateCameras]');*/
};

BicycleGame.prototype.UpdateGameState = function () {
	/*INTERFACE*/
	/*this.logManager.Debug('[BicycleGame.UpdateGameState]');*/
};