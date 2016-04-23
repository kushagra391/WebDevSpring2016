(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, $http, UserService) {

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

            $http.post("/api/assignment/register", user)
                .success(function (currentUser) {
                    if (currentUser != null) {
                        $rootScope.currentUser = currentUser;
                        $location.url("/profile/" + currentUser._id);
                    }
                });
        }

    }

})();