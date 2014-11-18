ENGINE2D.Interval = function (logManager) {
	this.logManager = logManager;
	this.dt = ENGINE2D.DEFAULT_DT;
	this.dtMax = ENGINE2D.DEFAULT_DTMAX;
	this.frameTime = 0.0;
	this.realFrameTime = 0.0;
	this.accumTime = 0.0;
	this.totalTime = 0.0;
	this.alpha = 0.0;
	this.startTime = Date.now();
	this.lastTime = this.startTime;
	this.newTime = this.startTime;
};

ENGINE2D.Interval.prototype = {

	constructor: ENGINE2D.Interval,

	Frame: function (simulator) {
		this.newTime = Date.now();
		this.realFrameTime = (this.newTime - this.lastTime) / 1000.0;
		this.frameTime = this.realFrameTime;
		
		if (this.frameTime > this.dtMax) { this.frameTime = this.dtMax; }

		this.accumTime += this.frameTime;

		while (this.accumTime >= this.dt) {
			simulator.OnSimulate(this.totaltime, this.dt);
			
			this.accumTime -= this.dt;
			this.totalTime += this.dt;
		}

		this.alpha = this.accumTime / this.dt;
		simulator.OnInterpolate(this.alpha);
		
		simulator.OnDisplay();
    
		this.lastTime = this.newTime;
	},

	GetFPS: function () {
		return 1.0 / this.realFrameTime;
	},
	
	SetDt: function (dt) {
		this.dt = dt;
	},
	
	SetDtMax: function (dtMax) {
		this.dtMax = dtMax;
	}
};