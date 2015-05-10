'use strict';

angular.module('app.reactitemlist', ['ngRoute', 'react'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reactitemlist', {
    templateUrl: 'reactitemlist/reactitemlist.html',
    controller: 'ReactItemListCtrl'
  });
}])

.controller('ReactItemListCtrl', [ function() {

}]);