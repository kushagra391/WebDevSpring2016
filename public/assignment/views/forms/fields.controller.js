(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope) {
        $scope.hello = "From Scope";
    }

})();
