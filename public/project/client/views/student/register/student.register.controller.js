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

            StudentService
                .createStudent(newStudent)
                .then(
                    function (response) {
                        console.log("User registered, added to session");
                        var student = response.data;
                        $location.url("/studentProfile/" + student._id);
                    },
                    function (response) {
                        console.log("User NOT registered");
                    }
                );
        }

    }

})();