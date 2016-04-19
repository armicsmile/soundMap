'use strict';

/* Services */

var soundMapServices = angular.module('soundMapServices', ['ngResource']);

/* Persistent settings service */
var settingsLoaded = false;
var settings;
soundMapServices.factory('Settings', ['$resource',
	function ($resource) {
		if (! settingsLoaded) {
			settings = $resource('data/settings-default.json', {}, {
				query: {method: 'GET', params: {}, isArray: false}
			});
			settingsLoaded = true;
		}
		return settings.get();
	}
]);

/** Connector class */
function SoundcloudConnector () {
	/** init routine */
	this.initialize = function (appKey) {
		this.appKey = appKey;
		SC.initialize({
			client_id: this.appKey
		});
		return this;
	}

	/** get users with a query */
	this.queryUsers = function (query) {
		return SC.get('/users', {
			"q": query
		});
	}
}
/** Soundcloud API connector */
soundMapServices.factory('Soundcloud', ['$resource',
	function ($resource) {
		var connector = new SoundcloudConnector(),
			settings = $resource('data/settings-default.json', {}, {
			query: {method: 'GET', params: {}, isArray: false}
		});
		settings.get(function (data) {
			connector.initialize(data.connections.soundcloud.clientId);
		});
		return connector;
	}
]);

/** Map Data service */
// Map data is a simple dictionary
var mapData = new MapGraph();
soundMapServices.factory('Mapdata', [function () {
		return mapData;
	}
]);