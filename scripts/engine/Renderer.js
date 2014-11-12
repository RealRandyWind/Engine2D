ENGINE2D.Renderer = function (logManager) {
	this.logManager = logManager;
	this.clearColor = ENGINE2D.DEFAULT_CLEARCOLOR;
	this.width = ENGINE2D.DEFAULT_RENDERWIDTH;
	this.height = ENGINE2D.DEFAULT_RENDERHEIGHT;
	this.canvas = undefined;
	this.context = undefined;

	this.projectionMatrix = new ENGINE2D.Matrix3();
	this.projectionMatrix.a33 = -1;
};

ENGINE2D.Renderer.prototype = {

	constructor: ENGINE2D.Renderer,

	SetDisplaySize: function (width,height) {
		if( this.canvas===null ) { 
			this.logManager.Warning('[Renderer.SetDisplaySize] canvas is not set yet.'); 
			return; 
		}

		this.width = width;
		this.height = height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.projectionMatrix.Set2(1.0, 0.0, this.width / 2, 0.0, 1.0, this.height / 2);
	},

	SetUp: function () {
		/*TODO MORE*/
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext('2d');
		this.SetDisplaySize(ENGINE2D.DEFAULT_RENDERWIDTH, ENGINE2D.DEFAULT_RENDERHEIGHT);

		this.logManager.Success('[Renderer.SetUp]');
	},

	ShutDown: function () {
		/*TODO MORE*/
		this.logManager.Success('[Renderer.ShutDown]');
	},

	Render: function (scene,camera) {
		if( this.context===null ) { 
			this.logManager.Warning('[Renderer.Render] context is not set yet.'); 
			return; 
		}

		this.context.save();
		this.context.fillStyle=this.clearColor;
		this.context.fillRect(0,0,this.width,this.height);
		
		this._DrawObjects(scene,camera);

		this.context.restore();
	},

	FullScreen: function () {
		/* TODO */
		console.error('_ERROR: [Renderer.FullScreen] function not yet implemented');
	},

	AddCanvasTo: function (container) {
		container.appendChild(this.canvas);
	},

	RemoveCanvasFrom: function (container) {
		container.removeChild(this.canvas);
	},

	_DrawObjects: function (scene, camera) {
		var viewMatrix = camera.GetViewMatrix();

		scene._SortRenderables();

		for (var i = scene.renderables.length - 1; i >= 0; i--) {
			var object = scene.renderables[i];
			
			if (object.isDisabled || !object.isVisible) {
				continue;
			}

			this._DrawObject(object, viewMatrix);
		}
	},

	_DrawObject: function (object, viewMatrix) {
		/* This is wrong since we ignore layers*/
		var material = object.material;
		var pivot = new ENGINE2D.Vector2(material.frame.x/2, material.frame.y/2);
		var MVP = new ENGINE2D.Matrix3();
		/* Better Interpolation animation needed for imag now we just use round 
		 * but image interpolation is heavy, though current solution gives us 
		 * artifacts during animation play.
		 */
		var frames = Math.round(object.stateTime * material.fps);
		frames = (material.loop ? (frames % material.fps) : Math.max(0,Math.min(frames, material.fps - 1)));

		MVP.ApplyMatrices3(this.projectionMatrix, viewMatrix);
		MVP.ApplyMatrix3(object.modelMatrix);

		this.context.setTransform(MVP.a11, MVP.a21, MVP.a12, MVP.a22, MVP.a13, MVP.a23);
		/* DEBUG START */
		if (material.rawImage === undefined || material.rawImage.src === undefined) {
			/*should apply clipping*/
			var points = object.geometry.pointSequence;
			this.context.fillStyle = ENGINE2D.DEFAULT_FILLCOLOR;
			this.context.strokeStyle = ENGINE2D.DEFAULT_LINECOLOR;
			this.context.beginPath();
			for (var i = points.length - 1; i >= 0; i--) {
				var point = points[i];
				if (i === points.length - 1) { this.context.moveTo(point.x, point.y); } 
				else { this.context.lineTo(point.x, point.y); }
			}
			this.context.closePath();
			this.context.fill();
			this.context.stroke();
			return;
		}
		/* DEBUG END */

		this.context.drawImage(
			material.rawImage,
			frames * material.frame.x,
			object.state * material.frame.y,
			material.frame.x,
			material.frame.y,
			-pivot.x,
			-pivot.y,
			material.frame.x,
			material.frame.y
		);
	}
};