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
function SoundcloudConnector () {}
/** init routine */
SoundcloudConnector.prototype.initialize = function ($http, appKey, selectParameters) {
	this.appKey = appKey;
	this.selectParameters = selectParameters;
	this.con = $http;
	SC.initialize({
		client_id: this.appKey
	});
	return this;
};
SoundcloudConnector.prototype.chainQuery = function (url, resultDict, queryCount) {
	// if query count has reached its limit -> do nothing to result array
	if (queryCount > 0) {
		var instance = this;
		this.con({
			method: 'GET',
			url: url
		}).then(
			// success
			function (response) {
				var result = response.data;
				if (result.collection) {
					for (var i = 0; i < result.collection.length; i++) {
						var item = result.collection[i];
						item.continue_search = instance.filterUsers(item);
						resultDict[item.id] = item;
					}
				}
				if (result.next_href) {
					// Post recursive strat
					return instance.chainQuery(result.next_href, resultDict, queryCount - 1);
				}
			},
			// failure
			function (result) {
				console.err('chained query failed to retrieve data from url : ' + url);
			}
		)
	}
	return resultDict;
}
/** query users by fulltext search */
SoundcloudConnector.prototype.queryUsers = function (query) {
	return SC.get('/users', {
		"q": query
	});
};
SoundcloudConnector.prototype.queryFollowings = function(user, followings) {
	var instance = this,
		pageSize   = 200,
		url        = 'http://api.soundcloud.com/users/' + user.id + '/followings?client_id=' + this.appKey + '&limit=' + pageSize,
		queryCount = Math.floor(user.followings_count / pageSize) + (user.followings_count % pageSize ? 1 : 0);
	this.chainQuery(url, followings, queryCount);
	return followings;
};
SoundcloudConnector.prototype.filterUsers = function (user, depth) {
	// Check that user has enough followers
	if (this.selectParameters.followersGt > user.followers_count) {
		return false;
	}
	return true;
}


/** Soundcloud API connector */
soundMapServices.factory('Soundcloud', ['$resource', '$http',
	function ($resource, $http) {
		var connector = new SoundcloudConnector(),
			settings = $resource('data/settings-default.json', {}, {
			query: {method: 'GET', params: {}, isArray: false}
		});
		settings.get(function (data) {
			connector.initialize($http, data.connections.soundcloud.clientId, data.selectParameters);
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