(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, UserService) {
        $scope.message = null;
        $scope.error = null;
        $scope.login = login;

        function login(user) {
            if (!user) {
                $scope.error = 'Error: User not set';
                return;
            }

            var credential = {username: user.username, password: user.password};
            UserService
                .findUserByCredentials(credential)
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile' + '/' + UserService.getCurrentUser()._id);

                    } else {
                        $scope.error = 'Failure: Please verify username / password';
                    }
                });
        }
    }
})();