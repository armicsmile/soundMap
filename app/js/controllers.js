'use strict';

/* Controllers */

var soundMapControllers = angular.module('soundMapControllers', []);

/** Index controller */
soundMapControllers.controller('IndexController', ['$scope', function($scope) {}]);

/** Map controller */
soundMapControllers.controller('MapController', ['$scope', 'Settings', 'Soundcloud', 'Mapdata',
	function($scope, Settings, Soundcloud, Mapdata) {
		$scope.settings = Settings;
		$scope.mapData = Mapdata;

		$scope.populateMap = function () {
			// Reset graph
			$scope.resetGraph();
			// create root node and add it to the Graph
			var rootNode = $scope.addNode($scope.settings.rootAccount);
			$scope.seekNeighbors(rootNode);
		};

		$scope.resetGraph = function () {
			Mapdata = new MapGraph();
		}

		$scope.addNode = function (data) {
			var node = new Node(data);
			Mapdata.addNode(node.data.id, node.data);
			return node;
		};

		$scope.seekNeighbors = function (node) {
			var followings = {};
			Soundcloud.queryFollowings(node.data, followings);
		};

		$scope.populateMap();

	}]
);

/** Settings controller */
soundMapControllers.controller('SettingsController', ['$scope', 'Settings', 'Soundcloud',
	function($scope, Settings, Soundcloud) {
		$scope.settings = Settings;

		/**
		 * Search for sc accounts from a string query
		 * Add results array to scope
		 */
		$scope.queryAccounts = function (query) {
			if (! query) {
				return;
			}
			var instance = this;
			Soundcloud.queryUsers(query).then(
				function (data) {
					if (data.length) {
						instance.$apply(function () {
							instance.accounts = data;
						});
					}
				}
			);
		};

		/**
		 * Set account in argument as the root account for related computations 
		 */
		$scope.setRootAccount = function (account) {
			$scope.settings.rootAccount = account;
		};
	}]
);