'use strict';

angular.module('app.itemlist', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/itemlist', {
            templateUrl: 'itemlist/itemlist.html',
            controller: 'ItemListController'
        });
    }])

    .controller('ItemListController', ['$scope', '$interval', function ($scope, $interval) {


        var Player = new function() {
            var handle = null;

            this.start = function( func, millies){
                handle = $interval( func, millies);
            };

            this.stop = function(){
                $interval.cancel(handle);
            };
        };

        var lastTime = 0;
        var frameCount = 1;
        var frameMsSum = 0;


        function reseed(itemCount) {
            var data = [];

            var now = performance.now();
            $scope.frameMs = now - lastTime;
            frameMsSum += $scope.frameMs;
            $scope.frameMsAvg = frameMsSum/(frameCount++);

            lastTime = now;
            for (var i = 0; i < itemCount; ++i) {
                data.push(
                    {
                        id:Math.floor((Math.random() * itemCount)),
                        timestamp: performance.now()
                    })
            }

            return data;
        }

        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }

        function shuffle(){
            var data = reseed($scope.items.count);
            $scope.items = {
                count : data.length,
                rows : chunk(data,3)
            }
        }

        $scope.togglePause = function(){
            $scope.control.isPaused = !$scope.control.isPaused;
            if($scope.control.isPaused){
                Player.stop();
            }else{
                Player.start(shuffle, $scope.control.interval);
            }
        };

        $scope.control = {
            interval : 500,
            isPaused : true
        };


        $scope.items ={
            count : 100,
            rows : []
        };

        function resetFrameStats(){
            frameCount = 1;
            frameMsSum = 0;
        }

        $scope.$watch('control.interval', resetFrameStats);
        $scope.$watch('items.count', resetFrameStats);

        shuffle();

    }]);