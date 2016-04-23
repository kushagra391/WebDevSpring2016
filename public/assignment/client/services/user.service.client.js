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
            deleteUser: deleteUser,
            updateUser: updateUser,
            createUser: createUser,
            getCurrentUser : getCurrentUser,
            setCurrentUser : setCurrentUser
        };
        return api;

        function logout() {
            return $http.post("/logout");
        }

        function createUser(user) {
            return $http.post('/rest/user', user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/rest/user/' + userId, user);
        }

        function deleteUser(userId) {
            return $http.delete('/rest/user/' + userId);
        }

        function findAllUsers() {
            return $http.get("/rest/user");
        }

        function register(user) {
            return $http.post("/register", user);
        }

        function login(user) {
            return $http.post("/login", user);
        }

        function getCurrentUser() {
            return $http.get('/api/assignment/loggedin');
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

    }

})();