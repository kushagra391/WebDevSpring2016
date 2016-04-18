(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('DeveloperService', DeveloperService);

    function DeveloperService($rootScope, $http, CourseService) {

        var model = {

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