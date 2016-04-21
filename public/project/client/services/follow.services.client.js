(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('FollowService', FollowService);

    function FollowService($http) {

        var api = {
            findAllFollows: findAllFollows,
            findFollowById: findFollowById,
            findFollowersForDevloperId: findFollowersForDevloperId,
            addFollowForUserAndCourse: addFollowForUserAndCourse,
            removeFollowById: removeFollowById,
            removeFollowForUserAndCourse: removeFollowForDeveloperAndStudent

        };

        return api;

        function findAllFollows() {
            return $http.get("/api/coursera/follow/all");
        }

        function findFollowById(followId) {
            return $http.get("/api/coursera/follow/" + followId);
        }

        function findFollowersForDevloperId(developerId) {
            return $http.get("/api/coursera/follow/developer/" + developerId);
        }

        function addFollowForUserAndCourse(newFollow) {
            return $http.post("/api/coursera/follow", newFollow);
        }

        function removeFollowById(followId) {
            return $http.delete("/api/coursera/follow/" + followId);
        }

        function removeFollowForDeveloperAndStudent(develperId, studentId) {
            return $http.delete("/api/coursera/follow/developer/" + develperId + "/student/" + studentId);
        }

    }

})();
