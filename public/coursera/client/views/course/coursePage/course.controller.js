(function () {
    
    "use strict";
    
    angular 
        .module('testApp')
        .controller('CourseController', CourseController);
    
    function CourseController($routeParams, CourseService) {
        var vm = this;
        console.log("Hello from CourseController: " + $routeParams.courseId);

        vm.course = CourseService.findCourseById($routeParams.courseId);
        vm.name = vm.course.name;
        vm.description = vm.course.description;
        vm.likes = vm.course.likes;
        vm.videos = vm.course.videos;
        console.log(JSON.stringify(vm.course));

        


    }
    
    
})();