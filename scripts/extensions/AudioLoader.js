ENGINE2D.AudioLoader = function (loadingManager, logManager) {
	ENGINE2D.Loader.call(this, loadingManager, logManager);
};

ENGINE2D.AudioLoader.prototype = Object.create(ENGINE2D.Loader.prototype);

ENGINE2D.AudioLoader.prototype.Load = function (url) {
	var rawAudio = this.cache.Get(url);
	var promise = new ENGINE2D.Promise();
	
	if (rawAudio !== undefined) {
		return promise;
	}

	rawAudio = new Audio();
	promise.data = rawAudio;

	var scope = {
		url: url,
		promise: promise,
		loadingManager: this.loadingManager,
		cache: this.cache
	};

	rawAudio.addEventListener('canplaythrough',this.OnCanPlayThrough.bind(scope), false);
	rawAudio.addEventListener('error',this.loadingManager.OnError.bind(this.loadingManager), false);
	
	rawAudio.src = url;

	this.loadingManager.ItemStart(url);
	
	return promise;
};

ENGINE2D.AudioLoader.prototype.OnCanPlayThrough = function (canPlayThroughEvent) {
	this.promise.isDone = true;
	this.cache.Add(this.url, this.rawAudio);
	this.loadingManager.ItemEnd(this.url);
};