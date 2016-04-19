(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('StudentService', StudentService);

    function StudentService($rootScope, $http, CourseService) {

        var model = {

            createStudent: createStudent,
            logout: logout,
        
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,

            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            addCourseToStudent: addCourseToStudent,
            removeCourseFromStudent: removeCourseFromStudent
        };

        return model;

        function createStudent(student) {
            return $http.post("/api/coursera/student", student);
        }

        function logout() {
            return $http.post("/api/coursera/student/logout");
        }

        function findUserById(userId) {

            for (var i in model.students) {
                var user = model.students[i];
                if (user._id == userId) {
                    return user;
                }
            }

            return null;
        }

        function findUserByCredentials(credential) {

            return $http.post("/api/coursera/student/login", credential);

        }

        function getCurrentUser() {
            // return $rootScope.currentUser;

            return $http.get("/api/coursera/student/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function addCourseToStudent(studentId, courseId) {

            // TODO: correctness measure (add only when the course is not already added)

            var url = "/api/coursera/student/" + studentId._id + "/course/" + courseId;
            console.log(">> addCourseToStudent: " + url);
            return $http.put(url);

        }

        function removeCourseFromStudent(studentId, courseId) {

            // TODO: correctness measure

            var url = "/api/coursera/student/" + studentId._id + "/course/" + courseId;
            console.log(">> removeCourseFromStudent: " + url);
            return $http.delete(url);

        }
    }

})();