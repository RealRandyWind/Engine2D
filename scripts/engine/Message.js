ENGINE2D.Message = function (type, rank, data) {
	this.type = type;
	this.rank = rank;
	this.data = data;
};

ENGINE2D.Message.prototype = {

	constructor: ENGINE2D.Message,

	GetData: function () {
		return this.data;
	}
};