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
            console.log('LoginController::Login: ' + JSON.stringify(credential));
            UserService
                .findUserByCredentials(credential)
                .then(function (response) {
                    console.log('login response: ' + JSON.stringify(response));
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