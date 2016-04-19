'use strict';

/* App Module */

var soundMapApp = angular.module('soundMapApp', [
	'ngRoute',
	'soundMapControllers',
	'soundMapFilters',
	'soundMapServices',
	'colorpicker.module'
]);

soundMapApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/home.html',
        	controller: 'IndexController'
		}).when('/settings', {
			templateUrl: 'partials/settings.html',
			controller: 'SettingsController'
		}).when('/map', {
			templateUrl: 'partials/map.html',
			controller: 'MapController'
		}).otherwise({
			templateUrl: 'partials/not-found.html'
		});
	}]
);