(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('StudentService', StudentService);

    function StudentService($rootScope, CourseService) {

        var model = {
            students: [
                {
                    "_id" : "101",
                    "name" : "Kushagra",
                    "username" : "kv391",
                    "password" : "123",
                    "courses_registerd" : [CourseService.courses[0], CourseService.courses[2]]
                },
                {
                    "_id" : "202",
                    "name" : "Nikhil",
                    "username" : "nikhil34",
                    "password" : "234",
                    "courses_registerd" : [CourseService.courses[1], CourseService.courses[2], CourseService.courses[3]]
                },
                {
                    "_id" : "303",
                    "name" : "Bhatta",
                    "username" : "bhatta21",
                    "password" : "523",
                    "courses_registerd" : [CourseService.courses[0], CourseService.courses[3]]
                }
            ],

            findUserByCredentials: findUserByCredentials,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };

        return model;

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
    }

})();