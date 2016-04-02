(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {

        function init() {
            $scope.users = null;

            function success(response) {
                $scope.users = response.data;
            }

            function error(response) {
                console.log('Error Occurred');
            }

            UserService
                .findAllUsers()
                .then(success, error);
        }

        init();

    }

})();