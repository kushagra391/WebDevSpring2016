(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = register;
        $scope.register_error = null;

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

            // var user = UserService.findUserByUsername(user.username);
            // if (user != null) {
            //     $scope.register_error = "User already exists";
            //     console.log('user not found by username');
            //     return;
            // }
            //
            // var newUser = UserService.createUser($scope.user);
            // UserService.setCurrentUser(newUser);
            // $location.url("/profile");
            //
            // console.log("registration successful");
            // console.log("after register" + UserService.findAllUsers());
        }

        // Helper to execute final leg for user registration
        function registerUser(user) {
            console.log("confirmed: user registration attempted");
            UserService
                .createUser(user)
                .then(function (response) {
                    if (response) {
                        UserService.setCurrentUser(response.data.pop());
                        $location.url('/profile' + '/' + UserService.getCurrentUser()._id);

                        $scope.message = 'Success: Registration done.';
                        // console.log(UserService.findAllUsers());
                    } else {
                        $scope.error = 'Failure: Registration failed';
                        // console.log(UserService.findAllUsers());
                    }

                });
        }
    }

})();