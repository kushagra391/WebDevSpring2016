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

            vm.course = CourseService.findCourseById($routeParams.courseId);
            vm.name = vm.course.name;
            vm.description = vm.course.description;
            vm.likes = vm.course.likes;
            vm.videos = vm.course.videos;
            console.log(JSON.stringify(vm.course));

            vm.addCourse = addCourse;
            vm.removeCourse = removeCourse;
            vm.redirectToContent = redirectToContent;
        }

        init();

        function redirectToContent(videoIndex) {
            var contentUrl = "/course/" + vm.course._id + "/content/" + videoIndex;
            console.log("Redirecting to url: " + contentUrl);
            $location.url(contentUrl);
        }

        function addCourse() {
            var courseId = $routeParams.courseId;
            var studentId = StudentService.getCurrentUser()._id;

            console.log('Add courseID: ' + courseId + " to studentID: " + studentId);
            StudentService.addCourseToStudent(courseId, studentId);
        }

        function removeCourse() {
            var courseId = $routeParams.courseId;
            var studentId = StudentService.getCurrentUser()._id;

            console.log('Add courseID: ' + courseId + " to studentID: " + studentId);
            StudentService.removeCourseToStudent(courseId, studentId);
        }

    }

})();