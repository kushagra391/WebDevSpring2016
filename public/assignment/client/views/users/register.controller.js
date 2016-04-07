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
            console.log("register(): user registration attempted");

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
                .then(success, failure);

            function success(response) {

                console.log(response);

                var responseUser = response.data;

                if (responseUser == null) {
                    console.log("null >> user already exists");
                    return;
                }

                if (responseUser.username === user.username) {
                    console.log("== >> user already exists");
                    return;
                }

                // else go ahead to create a user
                console.log('Creating a user AS No earlier entries of the user found');
                registerUser(user);
            }

            function failure(response) {
                console.log("FAILURE: something went wrong");
            }

            // UserService
            //     .findUserByUsername(user.username)
            //     .then(function (response) {''
            //         if (!response.data) {
            //             console.log('response.data == true: user exists');
            //             vm.error = 'ERROR: user exists';
            //         } else {
            //             console.log('response.data == false: user does  not exists, proceed to user registration');
            //             registerUser(user);
            //         }
            //     });
        }

        // Helper to execute final leg for user registration
        function registerUser(user) {
            console.log("registerUser(): confirmed: user registration attempted");

            UserService
                .createUser(user)
                .then(registerSuccess, registerError);
        }

        function registerSuccess(response) {

            console.log('registerSuccess');

            UserService.setCurrentUser(response.data);
            $location.url('/profile' + '/' + UserService.getCurrentUser()._id);

            vm.message = 'Success: Registration done.';
        }

        function registerError() {
            console.log('registerError');
            vm.error = 'Failure: Registration failed';
        }
    }

})();