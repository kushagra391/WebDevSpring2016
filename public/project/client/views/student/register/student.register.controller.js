(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('StudentRegisterController', StudentRegisterController);

    function StudentRegisterController($location, StudentService) {

        var vm = this;

        function init() {

            vm.$location = $location;
            vm.registerStudent = registerStudent;

        }

        init();

        function registerStudent(newStudent) {
            console.log("Trying registration for: " + JSON.stringify(newStudent));

            vm.register_error = null;
            if (newStudent == null) {
                vm.register_error = "Please fill in the required fields";
                console.log('details not filled yet');
                return;
            }
            if (!newStudent.username) {
                vm.register_error = "Please provide a username";
                console.log('username not provided');
                return;
            }
            if (!newStudent.password || !newStudent.verifypassword) {
                vm.register_error = "Please provide a password";
                console.log('password field not filled');
                return;
            }
            if (newStudent.password != newStudent.verifypassword) {
                vm.register_error = "Passwords must match";
                console.log('passwords dont match');
                return;
            }
            
            
            StudentService
                .createStudent(newStudent)
                .then(
                    function (response) {
                        console.log("User registered, added to session");
                        var student = response.data;

                        StudentService.setCurrentUser(student);
                        $location.url("/studentProfile/" + student._id);
                    },
                    function (response) {
                        console.log("User NOT registered");
                    }
                );
        }

    }

})();