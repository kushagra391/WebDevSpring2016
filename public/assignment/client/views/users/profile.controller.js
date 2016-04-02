(function () {

    "use strict";

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($routeParams, $location, UserService) {

        var vm = this;

        function init() {
            vm.currentUser = UserService.getCurrentUser();
            vm.errorMessage = null;
            vm.message = null;
            vm.id = $routeParams.id;
            vm.update = update;

            // TODO: when or how does the controller method get executed
            if (!vm.currentUser) {
                $location.url("/home");
            }
        }

        init();

        function update(user) {

            console.log('ProfileController: inside update()');
            if (!user) {
                vm.errorMessage = 'Error: User not populated correctly';
            } else {
                console.log('INFO: User getting updated');
                UserService
                    .updateUser($routeParams.id, user)
                    .then(function (response) {
                        if (response.data) {
                            UserService.setCurrentUser(vm.currentUser);
                            vm.message = 'Success: User updated succesfully';
                        } else {
                            vm.errorMessage = 'Failure: User Update Failed';
                        }
                    });
            }
        }
    }
})();