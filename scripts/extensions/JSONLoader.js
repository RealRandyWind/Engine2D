ENGINE2D.JSONLoader = function (loadingManager, logManager) {
	
	ENGINE2D.Loader.call(this, loadingManager, logManager);
};

ENGINE2D.JSONLoader.prototype = Object.create(ENGINE2D.Loader.prototype);

ENGINE2D.JSONLoader.prototype.Load = function (url) {	
	var promise = new ENGINE2D.Promise;
	promise.data = this.cache.Get(url);	
	
	if (promise.data !== undefined) {
		return promise;
	}

	var xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.overrideMimeType('application/json');
	xmlHttpRequest.open('GET',url,true);

	this.loadingManager.ItemStart(url);
	
	var scope = {
		url: url,
		promise: promise,
		xmlHttpRequest: xmlHttpRequest,
		loadingManager: this.loadingManager
	};

	xmlHttpRequest.addEventListener("readystatechange", this.OnReadyStateChange.bind(scope), false);
	xmlHttpRequest.addEventListener('error',this.loadingManager.OnError.bind(this.loadingManager), false);

	xmlHttpRequest.send(null);

	return promise;
};

ENGINE2D.JSONLoader.prototype.OnReadyStateChange = function (readyStateChangeEvent) {
	if (this.xmlHttpRequest.readyState == 4 && this.xmlHttpRequest.status == "200") {
		var json = JSON.parse(this.xmlHttpRequest.responseText);
		this.cache.Add(this.url, json);
		this.promise.data = json;
		this.promise.isDone = true;
		this.loadingManager.ItemEnd(this.url);
	}
};