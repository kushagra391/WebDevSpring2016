(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {
        $scope.$location = $location;
        $scope.logout = function () {
            UserService.setCurrentUser(null);
            $location.url('/home');

            console.log("logout successful");
        };
    }
})();