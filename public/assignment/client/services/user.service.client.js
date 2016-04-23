(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {
        var api = {
            login: login,
            logout: logout,
            register: register,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser
        };
        return api;

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/rest/user/' + userId, user);
        }

        function findAllUsers() {
            return $http.get("/rest/user");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function getCurrentUser() {
            return $http.get('/api/assignment/loggedin');
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

    }

})();