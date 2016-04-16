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

            var newUser = DeveloperService.findUserByCredentials(user);
            console.log("newUser: " + newUser);
            if (newUser != null) {
                var userId = newUser._id;
                DeveloperService.setCurrentUser(newUser);
                $location.url('/developerProfile/' + userId);
            }
            else {
                vm.error = "user / password did not match";
            }
        }
    }

})();