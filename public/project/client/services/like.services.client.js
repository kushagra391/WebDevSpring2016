(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('LikeService', LikeService);

    function LikeService($http) {

        var api = {
            findAllLikes: findAllLikes,
            findLikeById: findLikeById,
            findLikesForCourseId: findLikesForCourseId,
            addLikeForStudentAndCourse: addLikeForStudentAndCourse,
            removeLikeById: removeLikeById,
            removeLikeForStudentAndCourse: removeLikeForStudentAndCourse
        };

        return api;

        function findAllLikes() {
            return $http.get("/api/coursera/like/all");
        }

        function findLikeById(likeId) {
            return $http.get("/api/coursera/like/" + likeId);
        }

        function findLikesForCourseId(courseId) {
            return $http.get("/api/coursera/like/course/" + courseId);
        }

        function addLikeForStudentAndCourse(newLike) {
            return $http.post("/api/coursera/like", newLike);
        }

        function removeLikeById(likeId) {
            return $http.delete("/api/coursera/like/" + likeId);
        }

        function removeLikeForStudentAndCourse(courseId, studendId) {
            return $http.delete("/api/coursera/like/course/" + courseId + "/student/" + studendId);
        }

    }

})();