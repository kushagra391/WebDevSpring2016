(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .service("UserService", UserService);

    function UserService($rootScope, $http) {

        var userPath = '/api/assignment/user';

        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };
        return api;

        // API methods

        function findUserByUsername(username) {
            return $http.get(userPath + '?username=' + username);
        }

        // TODO: refactor credentials
        function findUserByCredentials(userCredentials) {
            return $http.post(userPath + '/login', userCredentials);
        }

        function findAllUsers() {
            return $http.get(userPath);
        }

        function createUser(user) {
            return $http.post(userPath, user);
        }

        function deleteUserById(userId) {
            return $http.delete(userPath + '/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put(userPath + '/' + userId, user);
        }

        // Helper Methods
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }
    }

})();
