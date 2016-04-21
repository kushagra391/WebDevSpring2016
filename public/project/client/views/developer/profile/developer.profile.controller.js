(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('DeveloperProfileController', DeveloperProfileController);

    function DeveloperProfileController($routeParams, $location, $rootScope, DeveloperService, CourseService) {
        var vm = this;
        vm.hello = "";

        function init() {
            console.log("UserID: " + $routeParams.profileId);
            vm.courses = [];
            vm.courseTypes = ["Arts And Humanity", "Business", "Web Development", "Computer Science", "Data Science",
                "Life Science", "Mathematics", "Social Science"];

            vm.$location = $location;
            vm.searchKey = "";
            vm.searchYoutube = searchYoutube;
            vm.startNewCourse = startNewCourse;
            vm.redirectToYoutube = redirectToYoutube;


            DeveloperService
                .getCurrentUser()
                .then(renderCurrentState);

        }

        init();

        function redirectToYoutube() {
            $location.url("/searchYoutube");
        }

        function startNewCourse(newCourse) {
            console.log("Starting new course.." + JSON.stringify(newCourse.name) + "devID: " + vm.developer._id);
            DeveloperService
                .addCourseForDeveloper(vm.developer._id, newCourse)
                .then(
                    function (response) {
                        $location.url("/searchYoutube/" + newCourse.name);
                    },
                    function (response) {
                        console.log("FATAL: " + response.data);
                    }
                );
        }


        function renderCurrentState(response) {
            vm.developer = response.data;

            populateDeveloperCourses();
        }

        function searchYoutube(searchKey) {

            if (searchKey == null) {
                $location.url('/searchYoutube/' + "video lectures");
            }
            else {
                console.log("Would search for :" + searchKey);
                $location.url('/searchYoutube/' + searchKey);
            }
        }

        function populateDeveloperCourses() {

            var developerId = vm.developer._id;

            CourseService
                .findAllCoursesByDeveloperId(developerId)
                .then(
                    function (response) {
                        vm.courses = response.data;
                        for (var i in vm.courses) {
                            var course = vm.courses[i];
                            console.log("CourseID: " + course._id);
                            var courseUrl = "#/course/" + course._id;
                            course.url = courseUrl;
                        }
                    },
                    function (response) {
                        console.log("Courses not retrieved");
                    }
                );
        }
    }

})();