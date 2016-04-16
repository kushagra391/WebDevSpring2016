(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('DeveloperService', DeveloperService);

    function DeveloperService($rootScope) {

        var model = {
            developers: [
                {
                    "_id": "501",
                    "name": "Sharad",
                    "username": "sp",
                    "password": "sp",
                    "courses_created": ["course1"]
                },
                {
                    "_id": "502",
                    "name": "Manish",
                    "username": "ma",
                    "password": "ma",
                    "courses_created": ["course3", "course4"]
                },
                {
                    "_id": "503",
                    "name": "Yudhistra",
                    "username": "yp",
                    "password": "yp",
                    "courses_created": ["course2"]
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

            for (var i in model.developers) {
                var developer = model.developers[i];

                if (developer.username == username && developer.password == password) {
                    return developer;
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