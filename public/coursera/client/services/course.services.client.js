(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('CourseService', CourseService);

    function CourseService($http) {

        var model = {

            findCourseById: findCourseById,
            findAllCoursesByStudentId : findAllCoursesByStudentId,
            findAllCoursesByDeveloperId : findAllCoursesByDeveloperId,
            searchCourseByQueryString: searchCourseByQueryString,
            addVideoToCourse: addVideoToCourse,
            deleteCourseById : deleteCourseById
        };

        return model;

        function findCourseById(courseId) {
            return $http.get("/api/coursera/course/" + courseId);
        }
        
        function findAllCoursesByDeveloperId(developerId) {
            return $http.get("/api/coursera/developer/" + developerId + "/course/all");
        }
        
        function findAllCoursesByStudentId(studentId) {
            return $http.get("/api/coursera/student/" + studentId + "/course/all");
        }

        function searchCourseByQueryString(searchKey) {
            return $http.get("/api/coursera/course/search/" + searchKey);
        }

        function addVideoToCourse(newVideo, courseId) {
            return $http.post("/api/coursera/course/" + courseId, newVideo);
        }

        function deleteCourseById(developerId, courseId) {

        }

    }

})();