(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($location, $rootScope, $http, UserService) {

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
            $http.post("/api/assignment/login", user)
                .success(function (currentUser) {
                    console.log("Response: " + JSON.stringify(currentUser));
                    $rootScope.currentUser = currentUser;
                    $location.url("/profile/" + currentUser._id);
                });
        }

    }
})();