(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope) {
        $scope.hello = "From HomeController";
    }

})();
