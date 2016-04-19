(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('ContentController', ContentController);

    function ContentController($routeParams, CourseService, ContentService) {

        var vm = this;
        console.log("Hello from ContentController");

        var courseId = $routeParams.courseId;
        var contentIndex = $routeParams.contentIndex;
        console.log("ContentIndex: " + contentIndex);

        ContentService
            .findVideoByIdAndCourseId(courseId, contentIndex)
            .then(
                function (response) {
                    vm.video = response.data;
                    console.log("Content retrieved: \n" + JSON.stringify(vm.video));
                },
                function (response) {
                    console.log("Content not retrieved");
                }
            );

        // var courses = CourseService.findCourseById(courseId);
        // var videos = courses.videos;
        // var video = videos[contentIndex];
        //
        // vm.video = video;
    }

})();