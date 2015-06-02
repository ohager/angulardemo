'use strict';

angular.module('app.componentization', ['ngRoute', 'app.components'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/componentization', {
            templateUrl: 'componentization/componentization.html',
            controller: 'ComponentizationController'
        });
    }])

    .controller('ComponentizationController', ['$scope', function ($scope) {

        $scope.save = function(data){
            alert("Saved object:" + JSON.stringify(data));
        }
    }]);