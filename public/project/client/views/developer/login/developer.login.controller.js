(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('DeveloperLoginController', DeveloperLoginController);

    function DeveloperLoginController(DeveloperService, $location) {
        var vm = this;

        vm.$location = $location;
        vm.login = login;

        function login(user) {
            console.log("DeveloperLoginController: login()");

            DeveloperService
                .findUserByCredentials(user)
                .then(loginSuccess, error);

            function loginSuccess(response) {
                var newUser = response.data;
                if (newUser != null) {
                    var userId = String(newUser._id);
                    DeveloperService.setCurrentUser(newUser);
                    $location.url('/developerProfile/' + userId);
                }
                else {
                    vm.error = "user / password did not match";
                }
            }

            function error(response) {
                console.log(">> login: " + "something went wrong");
                vm.error = "user / password did not match";
            }


        }
    }

})();