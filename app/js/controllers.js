'use strict';

/* Controllers */

var soundMapControllers = angular.module('soundMapControllers', []);

/** Index controller */
soundMapControllers.controller('IndexController', ['$scope', function($scope) {}]);

/** Map controller */
soundMapControllers.controller('MapController', ['$scope', 'Settings', 'Mapdata',
	function($scope, Settings) {
		$scope.settings = Settings;

		// $scope.populateMap = function () {
		// 	// Reset graph
		// 	this.resetGraph();
		// 	// create root node and add it to the Graph
		// 	this.addNode($scope.settings.rootAccount);
		// };

		// $scope.resetGraph = function () {
		// 	Mapdata = {};
		// }

		// $scope.addNode = function (data) {
		// 	var node = new Node(data);
		// 	Mapdata.addNode(node.data.id, node.data);
		// };
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