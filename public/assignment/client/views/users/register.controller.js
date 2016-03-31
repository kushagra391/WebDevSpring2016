(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {

        function init() {
            $scope.register = register;
            $scope.register_error = null;
        }

        init();

        function register(user) {
            console.log("INFO: user registration attempted");

            $scope.register_error = null;
            if (user == null) {
                $scope.register_error = "Please fill in the required fields";
                console.log('details not filled yet');
                return;
            }
            if (!user.username) {
                $scope.register_error = "Please provide a username";
                console.log('username not provided');
                return;
            }
            if (!user.password || !user.verifypassword) {
                $scope.register_error = "Please provide a password";
                console.log('password field not filled');
                return;
            }
            if (user.password != user.verifypassword) {
                $scope.register_error = "Passwords must match";
                console.log('passwords dont match');
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    if (response.data) {
                        console.log('user exists');
                        $scope.error = 'ERROR: user exists';
                    } else {
                        registerUser(user);
                    }
                });
        }

        // Helper to execute final leg for user registration
        function registerUser(user) {
            console.log("confirmed: user registration attempted");
            UserService
                .createUser(user)
                .then(registerSuccess, registerError);
        }

        function registerSuccess(response) {
            UserService.setCurrentUser(response.data.pop());
            $location.url('/profile' + '/' + UserService.getCurrentUser()._id);

            $scope.message = 'Success: Registration done.';
        }

        function registerError() {
            $scope.error = 'Failure: Registration failed';
        }
    }

})();