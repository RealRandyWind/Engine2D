ENGINE2D.ImageLoader = function (loadingManager, logManager) {
	ENGINE2D.Loader.call(this, loadingManager, logManager);
};

ENGINE2D.ImageLoader.prototype = Object.create(ENGINE2D.Loader.prototype);

ENGINE2D.ImageLoader.prototype.Load = function (url) {
	var promise = new ENGINE2D.Promise();
	promise.data = this.cache.Get(url);
	
	if (promise.data !== undefined) {
		return promise;
	}
	
	var rawImage = new Image();
	promise.data = rawImage;

	var scope = {
		url: url,
		promise: promise,
		loadingManager: this.loadingManager,
		cache: this.cache
	};

	rawImage.addEventListener('load',this.OnLoad.bind(scope), false);
	rawImage.addEventListener('error',this.loadingManager.OnError.bind(this.loadingManager), false);
	
	rawImage.src = url;

	this.loadingManager.ItemStart(url);
	
	return promise;
};

ENGINE2D.ImageLoader.prototype.OnLoad = function (loadEvent) {
	this.promise.isDone = true;
	this.cache.Add(this.url, this.promise.rawImage);
	this.loadingManager.ItemEnd(this.url);
};