(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $routeParams, $location, UserService) {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.errorMessage = null;
        $scope.message = null;

        $scope.id = $routeParams.id;

        $scope.update = update;

        // TODO: when or how does the controller method get executed
        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            if (!user) {
                $scope.errorMessage = 'Error: User not populated correctly';
            } else {
                console.log('INFO: User getting updated');
                UserService
                    .updateUser($routeParams.id, user)
                    .then (function (response) {
                        if (response.data) {
                            UserService.setCurrentUser($scope.currentUser);
                            $scope.message = 'Success: User updated succesfully';
                        } else {
                            $scope.errorMessage = 'Failure: User Update Failed';
                        }
                    });
            }
        }
    }
})();