(function() {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope) {
        $scope.hello = "From AdminController"
    }

})();