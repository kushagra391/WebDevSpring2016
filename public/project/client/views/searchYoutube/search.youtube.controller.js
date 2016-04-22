(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('SearchYoutubeController', SearchYoutubeController);

    // TODO: This must be a protected page
    function SearchYoutubeController($routeParams, $location, $sce,
                                     DeveloperService, CourseService, YoutubeAPIService) {
        var vm = this;

        var TYPE_PLAYLIST = "playlist";
        var TYPE_VIDEO = "video";
        var api_key = "AIzaSyDvX6gB6-SABxToMYfQGCFk7SSCvh9bHeg";

        function init() {
            console.log('Hello from SearchYoutubeController');
            console.log('Searching for :' + $routeParams.searchKey);

            DeveloperService
                .getCurrentUser()
                .then(
                    function (response) {
                        var developer = response.data;
                        vm.developer = response.data;

                        if (developer != null) {

                            var developerId = developer._id;
                            CourseService
                                .findAllCoursesByDeveloperId(developerId)
                                .then(
                                    function (response) {
                                        vm.courses = response.data;

                                        for (var i in vm.courses) {
                                            var course = vm.courses[i];
                                            course.url = "#/course/" + course._id;
                                        }
                                    },
                                    function (response) {
                                        console.log("Error: Courses not found");
                                    }
                                )
                        }
                    }
                );

            vm.searchKey = $routeParams.searchKey;
            vm.searchYoutubeResults = searchYoutubeResults;
            vm.addVideo = addVideo;
            vm.getUrl = getUrl;

            searchYoutubeResults();
        }

        init();

        /********************* Scope Methods ********************/

        function getUrl(videoId) {
            var url = "http://www.youtube.com/embed/" + videoId + "?autoplay=0";
            return $sce.trustAsResourceUrl(url);
        }

        function addVideo(courseIndex, videoIndex) {

            var videoItem = vm.data.items[videoIndex];
            var courseId = vm.courses[courseIndex]._id;
            // CourseService.addVideoToCourse(video, courseId, vm.developer._id);
            console.log("Video: " + JSON.stringify(videoItem) + ", " + "courseId: " + courseId);

            var videotype = getVideoType(videoItem);
            console.log("VideoType: " + videotype);
            if (videotype == TYPE_VIDEO) {

                var video = {
                    title: videoItem.snippet.title,
                    description: videoItem.snippet.description,
                    imgUrl: videoItem.snippet.thumbnails.default.url,
                    youtubeId: videoItem.id.videoId
                };

                // add video to course
                CourseService
                    .addVideoToCourse(video, courseId)
                    .then(
                        function (response) {

                            console.log("Video added !");
                        },
                        function (response) {
                            console.log("Video NOT added !");
                        }
                    );

                // hide the add button
            }
            else if (videotype == TYPE_PLAYLIST) {

                // parse videos from playlist
                parseVideosFromPlaylist(videoItem, courseId);

                // TODO: ask user for options

                // add all videos from playlist ** >> provide options
            }
        }

        function searchYoutubeResults() {
            var searchKey = vm.searchKey;

            $location.url("/searchYoutube/" + searchKey);
            queryYoutube(searchKey);
        }

        function queryYoutube(searchKey) {

            var url_prefix = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
            var url_suffix = "&key=" + api_key;
            var url = url_prefix + searchKey + url_suffix;
            console.log(url);

            return YoutubeAPIService
                .getYoutubeQueryResults(url)
                .then(render);

            // return $http.get(url)
            //     .success(render);

            function render(response) {
                console.log("Youtube Response: " + JSON.stringify(response));
                // vm.data = response;
                vm.data = response.data;

                console.log(vm.data.items[0].id.videoId);
                console.log(vm.data.items[0].snippet.thumbnails.default.url);

                return vm.data;
            }
        }

        function parseVideosFromPlaylist(videoItem, courseId) {

            var playlistId = videoItem.id.playlistId;

            var url = getPlaylistUrl(playlistId);


            YoutubeAPIService
                .getYoutubeQueryResults(url)
                .then(render);

            // $http.get(url)
            //     .success(render);

            function render(response) {

                // var videos = response.items;
                var videos = response.data.items;

                for (var i in videos) {
                    var playlistVideoItem = videos[i];
                    // console.log(JSON.stringify(playlistVideoItem));
                    var video = {
                        title: playlistVideoItem.snippet.title,
                        description: playlistVideoItem.snippet.description,
                        imgUrl: playlistVideoItem.snippet.thumbnails.default.url,
                        youtubeId: playlistVideoItem.snippet.resourceId.videoId
                    };

                    CourseService.addVideoToCourse(video, courseId, vm.developer._id);
                    console.log(i + " >> " + "Adding " + playlistVideoItem.snippet.title + "to courseID: " + courseId);
                }

                return response;
            }
        }

        /********************* Helper Methods ********************/

        function getPlaylistUrl(playlistId) {

            // Refer: https://developers.google.com/youtube/v3/docs/playlistItems/list#try-it
            return "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" +
                playlistId + "&key=" + api_key;
        }

        function getVideoType(videoItem) {
            var typeString = videoItem.id.kind;
            console.log("typeString: " + typeString);

            if (typeString.toLowerCase().indexOf(TYPE_PLAYLIST) != -1) {
                return TYPE_PLAYLIST;
            }
            else if (typeString.toLowerCase().indexOf(TYPE_VIDEO) != -1) {
                return TYPE_VIDEO;
            }
            else
                return null;

        }
    }

})();