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
            addVideoToCourse: addVideoToCourse
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

            // var results = [];
            // console.log("searchCourseByQueryString: " + searchKey);
            //
            // // match title first
            // for (var i in model.courses) {
            //     var course = model.courses[i];
            //
            //     var text1 = course.name;
            //     var text2 = course.description;
            //
            //     if (text1.toLowerCase().indexOf(searchKey) != -1) {
            //         console.log("Match Found");
            //         results.push(course);
            //     }
            // }
            //
            // // search in description
            // for (var i in model.courses) {
            //     var course = model.courses[i];
            //
            //     var text1 = course.name;
            //     var text2 = course.description;
            //
            //     if (
            //         text2.toLowerCase().indexOf(searchKey) != -1) {
            //         console.log("Match Found");
            //         results.push(course);
            //     }
            // }
            //
            // return results;
        }

        function addVideoToCourse(newVideo, courseId) {

            return $http.post("/api/coursera/course/" + courseId, newVideo);

        }

    }

})();