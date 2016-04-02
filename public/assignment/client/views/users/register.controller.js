(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {

        var vm = this;

        function init() {
            vm.register = register;
            vm.register_error = null;
        }

        init();

        function register(user) {
            console.log("INFO: user registration attempted");

            vm.register_error = null;
            if (user == null) {
                vm.register_error = "Please fill in the required fields";
                console.log('details not filled yet');
                return;
            }
            if (!user.username) {
                vm.register_error = "Please provide a username";
                console.log('username not provided');
                return;
            }
            if (!user.password || !user.verifypassword) {
                vm.register_error = "Please provide a password";
                console.log('password field not filled');
                return;
            }
            if (user.password != user.verifypassword) {
                vm.register_error = "Passwords must match";
                console.log('passwords dont match');
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .then(function (response) {
                    if (response.data) {
                        console.log('user exists');
                        vm.error = 'ERROR: user exists';
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

            vm.message = 'Success: Registration done.';
        }

        function registerError() {
            vm.error = 'Failure: Registration failed';
        }
    }

})();