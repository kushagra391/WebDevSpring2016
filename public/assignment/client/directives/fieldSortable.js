(function(){
    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);

    function fieldSortable() {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {

            var sortableAxis = attributes.sortableAxis;

            var start = null;
            var end = null;

            $(element).sortable({
                // axis: "y",
                axis: sortableAxis,

                start: function (event, ui) {
                    start = ui.item.index();

                    console.log('start item index: ' + start);
                },

                stop: function (event, ui) {
                    end = ui.item.index();

                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;

                    scope.$apply();

                    console.log('end item index: ' + end);
                }
            });
        }
        return {
            link: link
        }
    }
})();