(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($location, UserService) {
        
        var vm = this;
        
        vm.message = null;
        vm.error = null;
        vm.login = login;

        function login(user) {
            if (!user) {
                vm.error = 'Error: User not set';
                return;
            }

            var credential = {username: user.username, password: user.password};
            console.log('LoginController::Login: ' + JSON.stringify(credential));
            UserService
                .findUserByCredentials(credential)
                .then(function (response) {
                    console.log('login response: ' + JSON.stringify(response));
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url('/profile' + '/' + UserService.getCurrentUser()._id);

                    } else {
                        vm.error = 'Failure: Please verify username / password';
                    }
                });
        }
    }
})();