(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('ContentService', ContentService);

    function ContentService($http) {

        var api = {

            findAllVideosByCourseId: findAllVideosByCourseId,
            findVideoByIdAndCourseId: findVideoByIdAndCourseId

        };

        return api;

        function findAllVideosByCourseId(courseId) {
            $http.get("/api/coursera/course/" + courseId + "/video/all");
        }

        function findVideoByIdAndCourseId(courseId, videoId) {
            $http.get("/api/coursera/course/" + courseId + "/video/" + videoId);
        }

    }

})();