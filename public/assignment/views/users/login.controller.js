(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.message = null;
        $scope.error = null;
        $scope.login = function (user) {

            console.log("Login attempted");

            var testUser = UserService.findUserByCredentials(user.username, user.password);
            if (testUser != null) {
                UserService.setCurrentUser(testUser);
                $location.url('/profile');
                console.log("Login successful");
            }
            else {
                console.log("Login failed");
                $scope.error = "Wrong username / password entered. Please retry."
            }
        };
    }
})();