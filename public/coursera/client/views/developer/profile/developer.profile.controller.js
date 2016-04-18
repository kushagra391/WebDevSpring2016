(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('DeveloperProfileController', DeveloperProfileController);

    function DeveloperProfileController($routeParams, $location, DeveloperService, CourseService) {
        var vm = this;
        vm.hello = "";

        function init() {
            console.log("UserID: " + $routeParams.profileId);
            vm.courses = [];
            vm.developer = DeveloperService.getCurrentUser();

            vm.$location = $location;
            vm.searchKey = "";
            vm.searchYoutube = searchYoutube;

            populateDeveloperCourses();
        }

        init();

        function searchYoutube(searchKey) {
            console.log("Would search for :" + searchKey);
            $location.url('/searchYoutube/' + searchKey);
        }

        function populateDeveloperCourses() {

            var developer = DeveloperService.getCurrentUser();
            var courseIds = developer.courses_created;

            for (var i in courseIds) {

                var courseId = courseIds[i];
                CourseService
                    .findCourseById(courseId)
                    .then(
                        function (response) {
                            var course = response.data;

                            var courseUrl = "#/course/" + course._id;
                            course.url = courseUrl;

                            vm.courses.push(course);
                        },
                        function (response) {
                            console.log("Course not found for ID: " + courseId);
                        }
                    );
            }
        }
    }

})();