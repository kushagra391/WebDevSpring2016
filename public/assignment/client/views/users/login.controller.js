(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;

        function init() {
            vm.$location = $location;

            vm.message = null;
            vm.error = null;

            vm.login = login;
        }

        init();

        function login(user) {
            console.log("Trying for login... ");

            UserService
                .login(user)
                .then(
                    function (response) {
                        var currentUser = response.data;

                        console.log("Response: " + JSON.stringify(currentUser));
                        $rootScope.currentUser = currentUser;
                        $location.url("/profile/" + currentUser._id);
                    }
                );

        }

    }
})();