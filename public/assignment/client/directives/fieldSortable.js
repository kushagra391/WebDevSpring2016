(function () {
    angular
        .module("fieldSortable", [])
        .directive("fieldSortable", fieldSortable);

    function fieldSortable() {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {

            var start = null;
            var end = null;

            var sortableAxis = attributes.sortableAxis;
            $(element).sortable({
                axis: sortableAxis,

                start: function (event, ui) {
                    start = ui.item.index();

                    console.log('start item index: ' + start);
                },

                stop: function (event, ui) {
                    end = ui.item.index();
                    console.log('end item index: ' + end);

                    scope.model.swapFields(start, end);
                    scope.$apply();
                }
            });
        }

        return {
            link: link
        };
    }
})();