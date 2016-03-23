(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $routeParams, $location, UserService) {
        console.log('Inside ProfileController');
        $scope.currentUser = UserService.getCurrentUser();
        $scope.errorMessage = null;
        $scope.message = null;
        $scope.id = $routeParams.id;

        console.log('Inside ProfileController: checking for currentUser');
        // TODO: when or how does the controller method get executed
        if (!$scope.currentUser) {
            console.log('Inside ProfileController: checking for currentUser > Current User not found');
            $location.url("/home");
        }

        $scope.update = function (user) {
            UserService.updateUser($routeParams.id, user);

            if (user) {
                $scope.message = "Successful: user updated.";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.errorMessage = "Failed: User not updated.";
                console.log("Failed: user not updated")
            }

            console.log("List of All Users : " + UserService.findAllUsers());
        };
    }
})();