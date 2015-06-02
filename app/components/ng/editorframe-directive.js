"use strict";

angular.module('app.components.editorframe', [])

    .directive('editorFrame', function() {
        return {
            templateUrl: 'components/ng/editorframe.html',
            transclude: true,
            scope : {
                title : '@',
                onsave : '='
            },
            controller : function($scope){
                $scope.editorModel = {};

                this.updateModel = function(model){
                    $scope.editorModel = model;
                };

                $scope.requestSave = function(editorModel) {
                    $scope.onsave(editorModel);
                };

            }
        };
    });