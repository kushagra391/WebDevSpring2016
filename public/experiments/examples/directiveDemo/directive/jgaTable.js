(function () {

    "use strict";

    angular
        .module('jgaTable', [])
        .directive("jgaTable", jgaSortable);

    function jgaSortable() {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {
            var jgaAxis = attributes.jgaAxis;

            $(element).sortable({
                axis: jgaAxis,
                start: function (event, ui) {
                    start = ui.item.index();
                    console.log('start: ' + start);
                },
                stop: function (event, ui) {
                    end = ui.item.index();
                    console.log('end: ' + end);

                    // swap entries in scope [edit scope]
                    var temp = scope.users[start];
                    scope.users[start] = scope.users[end];
                    scope.users[end] = temp;

                    // apply the changes to scope [set scope]
                    scope.$apply();
                }
            });
        }

        return {
            link: link
        };
    }
})();
