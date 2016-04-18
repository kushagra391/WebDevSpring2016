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

            logout : logout,

            createDeveloper: createDeveloper,
            findUserByCredentials: findUserByCredentials,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser
        };

        return model;

        function logout() {
            return $http.post("/api/coursera/logout");
        }

        function createDeveloper(newDeveloper) {
            return $http.post('/api/coursera/developer', newDeveloper);
        }

        function findUserByCredentials(credential) {
            return $http.post("/api/coursera/developer/login", credential);
        }

        function getCurrentUser() {
            return $http.get("/api/coursera/developer/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }
    }

})();