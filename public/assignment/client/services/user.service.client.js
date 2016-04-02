(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .service("UserService", UserService);

    function UserService($rootScope, $http) {

        var userPath = '/api/assignment/user';
        var userLoginPath = '/api/assignment/user/login';

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
            console.log('INFO: trying to find username from user');
            return $http.get(userPath + '?username=' + username);

        }

        // TODO: refactor credentials
        function findUserByCredentials(userCredentials) {
            console.log('client: ' + JSON.stringify(userCredentials));
            return $http.post(userLoginPath, userCredentials);
        }

        function findAllUsers() {
            return $http.get(userPath + "/all");
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
