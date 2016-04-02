(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($location, UserService) {

        var vm = this;

        function init() {
            vm.message = null;
            vm.error = null;
            vm.login = login;
        }
        init();

        function resolvedHandler(response) {
            if (response.data) {
                UserService.setCurrentUser(response.data);
                $location.url('/profile' + '/' + UserService.getCurrentUser()._id);
            }
        }

        function rejectHandler(response) {
            vm.error = 'Failure: Please verify username / password';
        }

        function login(user) {
            if (!user) {
                vm.error = 'Error: User not set';
                return;
            }

            var credential = {username: user.username, password: user.password};
            console.log('LoginController::Login: ' + JSON.stringify(credential));
            UserService
                .findUserByCredentials(credential)
                .then(resolvedHandler, rejectHandler);
        }
    }
})();