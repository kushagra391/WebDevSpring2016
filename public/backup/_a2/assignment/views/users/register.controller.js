(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
        $scope.register = register;
        $scope.register_error = null;

        function register(user) {
            console.log("user registration attempted")

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
            var user = UserService.findUserByUsername(user.username);
            if (user != null) {
                $scope.register_error = "User already exists";
                console.log('user not found by username');
                return;
            }

            var newUser = UserService.createUser($scope.user);
            UserService.setCurrentUser(newUser);
            $location.url("/profile");

            console.log("registration successful");
            console.log("after register" + UserService.findAllUsers());
        }
    }

})();