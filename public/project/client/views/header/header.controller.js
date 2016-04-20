(function () {

    "use strict";

    angular
        .module('testApp')
        .controller("HeaderController", HeaderController);

    function HeaderController($location, DeveloperService, StudentService) {

        var vm = this;
        console.log(">> HeaderController");

        function init() {
            vm.$location = $location;

            vm.searchKey = "";
            vm.searchCatalog = searchCatalog;

            vm.logoutStudent = logoutStudent;
            vm.logoutDeveloper = logoutDeveloper;

            DeveloperService
                .getCurrentUser()
                .then(
                    function (response) {
                        if (response)
                            vm.currentDeveloper = response.data;
                    },
                    function (response) {
                        console.log("ERROR: Current Developer not retrieved. " + response);
                    }
                );

            StudentService
                .getCurrentUser()
                .then(
                    function (response) {
                        console.log("INFO: Response Data: " + response.data);
                        if (response.data != null) {
                            vm.currentStudent = response.data;
                            console.log("HeaderController >> Student logged in! -- " + JSON.stringify(vm.currentStudent));
                        } else {
                            console.log("HeaderController >> Student NOT logged in!");
                        }
                    },
                    function (response) {
                        console.log("ERROR: Current Student not retrieved. " + response);
                    }
                )
        }

        init();

        function logoutStudent() {
            console.log("Destroying Session for Student, logout clicked !");
            StudentService
                .logout()
                .then(
                    function (response) {
                        console.log("Student Session Destroyed !");
                        StudentService.setCurrentUser(null);
                        $location.url('/home');
                    },
                    function (err) {
                        console.log("Not destroyed");
                    }
                )
        }

        function logoutDeveloper() {
            console.log("Destroying Session for Student, logout clicked !");
            DeveloperService
                .logout()
                .then(
                    function (response) {
                        console.log("Student Session Destroyed !");
                        DeveloperService.setCurrentUser(null);
                        $location.url('/home');
                    },
                    function (err) {
                        console.log("Not destroyed");
                    }
                )
        }

        function searchCatalog() {
            console.log("Redirecting to searchcatalog with : " + vm.searchKey);
            $location.url('/searchCatalog/' + vm.searchKey);
        }

    }

})();