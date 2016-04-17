(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('StudentService', StudentService);

    function StudentService($rootScope, CourseService) {

        var model = {
            students: [
                {
                    "_id": "101",
                    "name": "Kushagra",
                    "username": "kv",
                    "password": "kv",
                    "courses_registerd": [CourseService.courses[0], CourseService.courses[2]]
                },
                {
                    "_id": "202",
                    "name": "Nikhil",
                    "username": "nikhil34",
                    "password": "234",
                    "courses_registerd": [CourseService.courses[1], CourseService.courses[2], CourseService.courses[3]]
                },
                {
                    "_id": "303",
                    "name": "Bhatta",
                    "username": "bhatta21",
                    "password": "523",
                    "courses_registerd": [CourseService.courses[0], CourseService.courses[3]]
                }
            ],

            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,

            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,

            addCourseToStudent: addCourseToStudent,
            removeCourseToStudent : removeCourseToStudent
        };

        return model;

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

            var username = credential.username;
            var password = credential.password;

            for (var i in model.students) {
                var student = model.students[i];

                if (student.username == username && student.password == password) {
                    return student;
                }
            }

            return null;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function addCourseToStudent(courseId, studentId) {

            var course = CourseService.findCourseById(courseId);
            var student = findUserById(studentId);

            var courses = student.courses_registerd;

            courses.push(course); // save the new course

        }

        function removeCourseToStudent(courseId, studentId) {
            var course = CourseService.findCourseById(courseId);
            var student = findUserById(studentId);

            var courses = student.courses_registerd;

            var courseIndex = findIndex(courses, course);
            courses.splice(courseIndex, 1);
            console.log("courseRemoved with index: " + courseIndex);
        }

        function findIndex(array, element) {

            for (var i in array) {
                if (array[i] == element) {
                    return i;
                }
            }

            return -1;
        }

    }

})();