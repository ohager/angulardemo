'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
  'ngRoute',
  'react',
  'ui.bootstrap',
  'app.itemlist',
  'app.reactitemlist',
  'app.componentization',
  'app.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/itemlist'});
}]);



