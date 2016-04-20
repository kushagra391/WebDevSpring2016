(function () {

    "use strict";

    angular
        .module('testApp')
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $location, DeveloperService, StudentService) {

        var vm = this;
        console.log(">> HeaderController");

        function init() {
            vm.$location = $location;

            vm.searchKey = "";
            vm.searchCatalog = searchCatalog;

            vm.logoutStudent = logoutStudent;
            vm.logoutDeveloper = logoutDeveloper;

            vm.redirectToStudentProfile = redirectToStudentProfile;
            vm.redirectToDeveloperProfile = redirectToDeveloperProfile;

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


        function redirectToDeveloperProfile() {
            DeveloperService
                .getCurrentUser()
                .then(
                    function (response) {
                        console.log("INFO: Response Data: " + response.data);
                        if (response.data != null) {


                            vm.currentDeveloper = response.data;
                            var url = "/developerProfile/" + vm.currentDeveloper._id;

                            console.log("Redirecting.. URL: " + url);
                            $location.url(url);
                        } else {
                            console.log("HeaderController >> Developer NOT logged in!");
                        }
                    },
                    function (response) {
                        console.log("ERROR: Current Developer not retrieved. " + response);
                    }
                );
        }


        function redirectToStudentProfile() {

            StudentService
                .getCurrentUser()
                .then(
                    function (response) {
                        console.log("INFO: Response Data: " + response.data);
                        if (response.data != null) {


                            vm.currentStudent = response.data;
                            var url = "/studentProfile/" + vm.currentStudent._id;

                            console.log("Redirecting.. URL: " + url);
                            $location.url(url);
                        } else {
                            console.log("HeaderController >> Student NOT logged in!");
                        }
                    },
                    function (response) {
                        console.log("ERROR: Current Student not retrieved. " + response);
                    }
                );
        }

        function logoutStudent() {
            console.log("Destroying Session for Student, logout clicked !");
            StudentService
                .logout()
                .then(
                    function (response) {
                        console.log("Student Session Destroyed !");
                        vm.currentStudent = null;
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
                        console.log("Developer Session Destroyed !");

                        vm.currentDeveloper = null;

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