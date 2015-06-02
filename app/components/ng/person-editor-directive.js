"use strict";

angular.module('app.components.personeditor', ['app.components.editorframe'])

    .directive('personEditor', function($rootScope) {
        return {
            require : "^editorFrame",
            restrict : "AE",
            scope : {
            },
            templateUrl: 'components/ng/person-editor-directive.html',
            link : function($scope, element, attrs, frameCtrl)
            {
                $scope.changed = function(scope){
                    frameCtrl.updateModel(scope.person);
                }
            }
        };
    });