(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {

        function init() {
            $scope.$location = $location;
        }

        init();

        $scope.logout = function () {
            UserService.setCurrentUser(null);
            UserService
                .logout()
                .then(
                    function (response) {
                        console.log("Logout Successful");
                        $location.url('/home');
                    }
                );

        };
    }
})();