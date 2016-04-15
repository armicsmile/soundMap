'use strict';

/* Controllers */

var soundMapControllers = angular.module('soundMapControllers', []);

soundMapControllers.controller('IndexController', ['$scope', function($scope) {}]);
soundMapControllers.controller('MapController', ['$scope', 'Settings',
	function($scope, Settings) {
		$scope.settings = Settings;
	}]
);
soundMapControllers.controller('SettingsController', ['$scope', 'Settings', 'Soundcloud',
	function($scope, Settings, Soundcloud) {
		$scope.settings = Settings;
		$scope.accounts = [];

		var connector = Soundcloud.get();
		$scope.queryAccounts = function (query) {
			Soundcloud.queryUsers(query, function (accounts) {
				alert('retrieved ' + accounts.length + ' accounts');
			})
		}
	}]
);