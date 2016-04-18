(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('DeveloperService', DeveloperService);

    function DeveloperService($rootScope, $http, CourseService) {

        var model = {
            developers: [
                {
                    "_id": "501",
                    "name": "Sharad Prakash",
                    "username": "sp",
                    "password": "sp",
                    "courses_created": [CourseService.courses[0]]
                },
                {
                    "_id": "502",
                    "name": "Manish Anand",
                    "username": "ma",
                    "password": "ma",
                    "courses_created": [CourseService.courses[2], CourseService.courses[3]]
                },
                {
                    "_id": "503",
                    "name": "Yudhistra Pathak",
                    "username": "yp",
                    "password": "yp",
                    "courses_created": [CourseService.courses[1]]
                }
            ],

            findUserByCredentials: findUserByCredentials,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };

        return model;

        function findUserByCredentials(credential) {

            return $http.post("/api/coursera/developer/login", credential);

            // var username = credential.username;
            // var password = credential.password;
            //
            // for (var i in model.developers) {
            //     var developer = model.developers[i];
            //
            //     if (developer.username == username && developer.password == password) {
            //         return developer;
            //     }
            // }
            //
            // return null;
        }
        
        function getCurrentUser() {
            return $rootScope.currentUser;
        }
        
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }

})();