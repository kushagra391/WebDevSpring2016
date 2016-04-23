(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .factory("AdminService", AdminService);

    function AdminService($http) {

        var api = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            removeUserById: removeUserById,
            updateUserById: updateUserById
        };

        return api;

        function createUser(newUser) {
            return $http.post("/api/assignment/rest/user", newUser);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/rest/user");
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/rest/user/" + userId);
        }

        function removeUserById(user) {
            return $http.delete("/api/assignment/rest/user/" + user._id);
        }

        function updateUserById(user) {

            var newUser = user;
            var userId = user._id;

            return $http.put("/api/assignment/rest/user/" + userId, newUser);
        }

    }

})();