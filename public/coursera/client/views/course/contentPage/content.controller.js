(function () {
    
    "use strict";
    
    angular 
        .module('testApp')
        .controller('ContentController', ContentController);
    
    function ContentController($routeParams, CourseService) {
        
        var vm = this;
        console.log("Hello from ContentController");
        
        var courseId = $routeParams.courseId;
        var contentIndex = $routeParams.contentIndex;
        console.log("ContentIndex: " + contentIndex);
        
        
        var courses = CourseService.findCourseById(courseId);
        var videos = courses.videos;
        var video = videos[contentIndex];
        
        vm.video = video;
        
        
        
    }
    
})();