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
            console.log(newStudent);

            StudentService
                .createStudent(newStudent)
                .then(registerSuccess, registerFailure);

            function registerSuccess(response) {
                console.log("Registration Success !");
                var student = response.data;

                StudentService.setCurrentUser(student);

                console.log("Routing to profile page.");
                $location.url("/studentProfile/" + student._id);
            }

            function registerFailure(response) {
                console.log(response);
            }

        }

    }

})();