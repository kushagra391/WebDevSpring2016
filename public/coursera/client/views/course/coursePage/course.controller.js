(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('CourseController', CourseController);

    function CourseController($routeParams, StudentService, CourseService) {
        var vm = this;

        function init() {
            console.log("Hello from CourseController: " + $routeParams.courseId);

            vm.course = CourseService.findCourseById($routeParams.courseId);
            vm.name = vm.course.name;
            vm.description = vm.course.description;
            vm.likes = vm.course.likes;
            vm.videos = vm.course.videos;
            console.log(JSON.stringify(vm.course));

            vm.addCourse = addCourse;
            vm.removeCourse = removeCourse;
        }

        init();

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