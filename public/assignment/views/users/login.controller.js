(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.message = null;
        $scope.error = null;
        $scope.login = function(user) {
            var testUser = UserService.findUserByCredentials(user.username, user.password);
            if (testUser != null) {
                UserService.setCurrentUser(testUser);
                $location.url('/profile');
            }
            else {
                $scope.error = "Wrong username / password entered. Please retry."
            }
        };

    }


})();