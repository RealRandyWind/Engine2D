$(document).ready(function() {
	logManager = new ENGINE2D.LogManager();
	loadingManager = new ENGINE2D.LoadingManager(logManager);

	interval = new ENGINE2D.Interval(logManager);
	renderer = new ENGINE2D.Renderer(logManager);
	simulator = new BicycleGame({},loadingManager,logManager);

	game = new ENGINE2D.Game(interval, renderer, simulator, logManager, loadingManager);

	game.SetUp();
	renderer.FullScreen();
	game.Start();
	//game.Interupt();
});