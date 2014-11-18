ENGINE2D.Geometry = function (pointSequence) {
	this.pointSequence = pointSequence;
	this.kdTree = undefined;

	if (pointSequence.length > ENGINE2D.DS_USEKDSIZE) {
		this._MakeKDTree();
	}
};

ENGINE2D.Geometry.prototype = {

	constructor: ENGINE2D.Geometry,

	IsInbound: function (point) {
		if (this.kdTree !== undefined) {
			return this._IsInbound(point);
		}

		for (var i = this.pointSequence.length - 1; i >= 0; i--) {
			/*this.pointSequence[i]; TODO*/
		}
		console.error('_ERROR: [Geometry.IsInbound] function not yet implemented');
	},

	Intersect: function (point, direction) {
		if (this.kdTree !== undefined) {
			return this._Intersect(point, direction);
		}

		for (var i = this.pointSequence.length - 1; i >= 0; i--) {
			/*this.pointSequence[i]; TODO*/
		}
		console.error('_ERROR: [Geometry.Intersect] function not yet implemented');
	},

	_Intersect: function (point, direction) {
		var hit = new ENGINE2D.Hit(Infinity, new ENGINE2D.Vector2(NaN,NaN));

		console.error('_ERROR: [Geometry._Intersect] function not yet implemented');

		return hit;
	},

	_IsInbound: function (point) {
		var hitCounts = {left: 0, right: 0};

		console.error('_ERROR: [Geometry._IsInbound] function not yet implemented');

		return (hitCounts.left % 2 !== 0) || (hitCounts.right % 2 !== 0);
	},

	_MakeKDTree: function () {
		if (this.pointSequence.length <= 0) { return; }
		var fSortX = function (a,b) { return b.x - a.x; };
		var fSortY = function (a,b) { return b.y - a.y; };
		
		var points = this.pointSequence.slice(0);
		var iMedian = Math.floor(points.length/2);
		points.sort(fSortX);
		this.kdTree = {point: points[iMedian], left: undefined, right: undefined, depth: 0};

		var queue = [{parent: this.kdTree, left: points.splice(0, iMedian), right: points}];
		while (queue.length > 0) {
			var entry = queue.shift();
			var depth = entry.depth + 1;
			var fSort = ((depth%2) === 0 ? fSortX : fSortY);

			if (entry.left.length > 0) {
				iMedian = Math.floor(entry.left.length/2);
				entry.left.sort(fSort);
				entry.parent.left = {point: entry.left[iMedian], left: undefined, right: undefined};
				queue.push({parent: parent.left, left: entry.left.splice(0, iMedian), right: entry.left, depth: depth});
			}

			if (entry.right.length > 0) {
				iMedian = Math.floor(entry.right.length/2);
				entry.left.right(fSort);
				entry.parent.right = {point: entry.right[iMedian], left: undefined, right: undefined};
				queue.push({parent: parent.right, left: entry.right.splice(0, iMedian), right: entry.right, depth: depth});
			}
		}
	},

	_SpliceArray2Entry: function (array, entry, pivot) {
		entry.left = array.splice(0, pivot);
		entry.right = array;
	}
};