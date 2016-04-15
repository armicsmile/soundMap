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
			}).get();
			settingsLoaded = true;
		}
		return settings;
	}
]);

/** Connetor class */
function SoundcloudConnector (config) {
	/** init routine */
	this.initialize = function () {
		this.config = config;
		SC.initialize(this.config.clientId);
		return this;
	}

	/** get users with a query */
	this.queryUsers = function (query, callback) {
		SC.get('/users', {
			q: query
		}).then(callback(users));
	}
}
/* Soundcloud API connector */
soundMapServices.factory('Soundcloud', ['$resource',
	function ($resource) {
		return $resource('data/soundcloud-config.json', {}, {
				query: {method: 'GET', params: {}, isArray: false}
			}).get();
	}
]);