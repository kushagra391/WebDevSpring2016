(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('CourseController', CourseController);

    function CourseController($routeParams, $location, StudentService, CourseService) {
        var vm = this;

        function init() {
            console.log("Hello from CourseController: " + $routeParams.courseId);

            vm.$location = $location;

            CourseService
                .findCourseById($routeParams.courseId)
                .then(renderCourse);

            vm.addCourse = addCourse;
            vm.removeCourse = removeCourse;
            vm.redirectToContent = redirectToContent;
        }

        init();

        function renderCourse(response) {
            vm.course = response.data;

            vm.name = vm.course.name;
            vm.description = vm.course.description;
            vm.likes = vm.course.likes;
            vm.videos = vm.course.videos;
            // console.log(JSON.stringify(vm.course));
        }

        function redirectToContent(videoIndex) {
            var contentUrl = "/course/" + vm.course._id + "/content/" + videoIndex;
            console.log("Redirecting to url: " + contentUrl);
            $location.url(contentUrl);
        }

        function addCourse() {
            var courseId = $routeParams.courseId;

            StudentService
                .getCurrentUser()
                .then(
                    function (response) {
                        var studentId = response.data;

                        StudentService
                            .addCourseToStudent(studentId, courseId)
                            .then(
                                function (response) {
                                    // TODO: Notify, remove the add button

                                    var user = response.data;

                                    StudentService
                                        .updateCurrentUser(user)
                                        .then(
                                            function (response) {
                                                console.log('Course successfully added');
                                            },
                                            function (response) {
                                                console.log("FATAL: course not added!"  + response);
                                            }
                                        )
                                },
                                function (response) {
                                    console.log('FATAL-2: Course successfully NOT added');
                                }
                            );
                    },
                    function (response) {
                        console.log('FATAL-1: Course successfully NOT added');
                    }
                );
        }

        function removeCourse() {

            var courseId = $routeParams.courseId;

            StudentService
                .getCurrentUser()
                .then(
                    function (response) {
                        var studentId = response.data;

                        StudentService
                            .removeCourseFromStudent(studentId, courseId)
                            .then(
                                function (response) {
                                    // TODO: Notify, remove the add button
                                    console.log('Course successfully removed');
                                },
                                function (response) {
                                    console.log('FATAL-2: Course successfully NOT removed');
                                }
                            );
                    },
                    function (response) {
                        console.log('FATAL-1: Course successfully NOT removed');
                    }
                );
        }

    }

})();