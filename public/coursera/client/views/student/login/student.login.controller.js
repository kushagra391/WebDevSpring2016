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

            var newUser = StudentService.findUserByCredentials(user);
            console.log("newUser: " + newUser);
            if (newUser != null) {
                var userId = newUser._id;
                StudentService.setCurrentUser(newUser);
                $location.url('/studentProfile/' + userId);
            }
            else {
                vm.error = "user / password did not match";
            }
        }

        
    }


})();