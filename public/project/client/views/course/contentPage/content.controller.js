(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('ContentController', ContentController);

    function ContentController($routeParams, $sce, CourseService, ContentService) {

        var vm = this;
        console.log("Hello from ContentController");

        function init() {
            var courseId = $routeParams.courseId;
            var contentIndex = $routeParams.contentIndex;
            console.log("ContentIndex: " + contentIndex);

            vm.getUrl = getUrl;
            vm.getContentUrl = getContentUrl;

            ContentService
                .findVideoByIdAndCourseId(courseId, contentIndex)
                .then(
                    function (response) {
                        vm.video = response.data;

                        var videoId = vm.video.youtubeId;

                        console.log("Content retrieved: \n" + JSON.stringify(vm.video));
                    },
                    function (response) {
                        console.log("Content not retrieved");
                    }
                );

            ContentService
                .findAllVideosByCourseId(courseId)
                .then(
                    function (response) {
                        vm.playlist = response.data;
                    },
                    function (response) {
                        console.log("Playlist not retrieved");
                    }
                );
        }

        init();

        function getUrl(videoId) {
            var url = "http://www.youtube.com/embed/" + videoId + "?autoplay=0";
            return $sce.trustAsResourceUrl(url);
        }

        function getContentUrl(videoIndex) {
            var courseId = $routeParams.courseId;
            var videos = vm.playlist;
            var video = videos[videoIndex];
            
            var url = "#/course/" + courseId + "/content/" + video._id;
            console.log(videoIndex + " >> playlist URL: " + url);
            return url;
        }

    }

})();