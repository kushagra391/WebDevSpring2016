(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('CourseController', CourseController);

    function CourseController($routeParams, $location, StudentService, DeveloperService, CourseService) {
        var vm = this;

        function init() {
            console.log("Hello from CourseController: " + $routeParams.courseId);

            vm.$location = $location;

            CourseService
                .findCourseById($routeParams.courseId)
                .then(renderCourse);

            DeveloperService
                .getCurrentUser()
                .then(
                    function (response) {
                        vm.developer = response.data;
                    }
                );

            vm.addCourse = addCourse;
            vm.removeCourse = removeCourse;
            vm.redirectToContent = redirectToContent;

            vm.deleteCourse = deleteCourse;
            
            vm.getContentUrl = getContentUrl;
        }

        init();

        
        function getContentUrl(videoIndex) {
           // console.log(">> Inside getContentUrl");

            var courseId = $routeParams.courseId;
            var videos = vm.course.videos;
            var video = videos[videoIndex];
            // console.log("Content clicked: " + JSON.stringify(video));
            var url = "#/course/" + courseId + "/content/" + video._id;
            // console.log(url);
            return url;
        }
        
        
        // TODO: only the course owner can delete a course
        function deleteCourse() {

            var courseId = $routeParams.courseId;
            var developerId = vm.developer._id;

            CoruseService
                .deleteCourseById(developerId, courseId)
                .then(
                    function (response) {
                        console.log("Course Deleted Succesfully");
                    },
                    function (response) {
                        console.log("ERROR");
                    }
                );
            
        }

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
            // console.log("Redirecting to url: " + contentUrl);
            // $location.url(contentUrl);
            console.log(">> Redirecting.. ");
            $location.url('/developerLogin');
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
                                    console.log('Course successfully added');
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