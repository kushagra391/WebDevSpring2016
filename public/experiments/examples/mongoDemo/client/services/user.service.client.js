(function () {

    "use strict";

    angular
        .module('mongoApp')
        .service('UserService', UserService);

    function UserService($http) {

        var api = {
            findAllUsers : findAllUsers,
            addUser : addUser
        };
        return api;


        function findAllUsers() {
            console.log("USERSERVICE: getting all users");
            return $http.get('/api/mongodemo/user/all');
        }
        
        function addUser(user) {
            return $http.post('/api/mongodemo/user', user);
        }

    }

})();