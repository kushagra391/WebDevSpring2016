(function () {

    angular
        .module('testApp')
        .controller('StudentLoginController', StudentLoginController);

    function StudentLoginController(StudentService, $location) {
        var vm = this;
        console.log('hello from StudentLoginController');

        vm.$location = $location;
        vm.login = login;

        function login(user) {
            console.log("StudentLoginController: login()");

            console.log("Credentials: " + JSON.stringify(user));
            StudentService
                .findUserByCredentials(user)
                .then(loginSuccess, loginFailure);

            function loginSuccess(response) {
                var newUser = response.data;

                if (newUser != null) {
                    var userId = newUser._id;
                    StudentService.setCurrentUser(newUser);
                    $location.url('/studentProfile/' + userId);
                }
                else {
                    vm.error = "user / password did not match";
                }
            }

            function loginFailure(response) {
                vm.error = "FATAL: >> loginFailure <<";
            }

            // var newUser = StudentService.findUserByCredentials(user);
            // console.log("newUser: " + newUser);
            // if (newUser != null) {
            //     var userId = newUser._id;
            //     StudentService.setCurrentUser(newUser);
            //     $location.url('/studentProfile/' + userId);
            // }
            // else {
            //     vm.error = "user / password did not match";
            // }
        }

    }

})();