/**
 * Graph Node class
 */
var Node = function (data) {
	this.data = data;
	this.edges = new Set();
}
Node.prototype.getData = function () {
	return this.data;
};

/**
 * Graph class
 */
var MapGraph = function () {
	this.nodeList = {};
}
MapGraph.prototype.addNode = function (id, data) {
	this.nodeList[id] = new Node(data);
};
MapGraph.prototype.addEdge = function (srcId, destId) {
	if (! this.containsId(srcId)) {
		console.error('Graph has no node with id #' + srcId);
		return false;
	}
	if (! this.containsId(destId)) {
		console.error('Graph has no node with id #' + destId);
		return false;
	}
	this.nodeList[srcId].edges.add(destId);
	return true;
}
MapGraph.prototype.containsId = function (id) {
	return id in this.nodeList;
};
MapGraph.prototype.get = function (id) {
	var node = this.nodeList[id];
	if (node !== undefined) {
		return node.data;
	}
};