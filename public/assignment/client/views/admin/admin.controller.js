(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    // TODO: pull out $http with AdminService
    function AdminController(AdminService) {

        var vm = this;

        function init() {

            AdminService
                .findAllUsers()
                .then(
                    function (users) {
                        console.log("All Users: " + JSON.stringify(users.data));
                        vm.users = users.data;
                    }
                );

            vm.remove = remove;
            vm.update = update;
            vm.add = add;
            vm.select = select;

        }

        init();

        function remove(user) {
            AdminService
                .removeUserById(user)
                .then(
                    function (users) {
                        vm.users = users.data;
                    }
                );
        }

        function update(user) {
            AdminService
                .updateUserById(user)
                .then(
                    function (users) {
                        vm.users = users.data;
                    }
                );
        }

        function add(user) {
            AdminService
                .createUser(user)
                .then(
                    function (users) {
                        vm.users = users.data;
                    }
                );
        }

        function select(user) {
            vm.user = angular.copy(user);
        }










        // $http.get("/api/assignment/rest/user")
        //     .success(function (users) {
        //         $scope.users = users;
        //     });
        //
        // $scope.remove = function (user) {
        //     $http.delete('/api/assignment/rest/user/' + user._id)
        //         .success(function (users) {
        //             $scope.users = users;
        //         });
        // };
        //
        // $scope.update = function (user) {
        //     $http.put('/api/assignment/rest/user/' + user._id, user)
        //         .success(function (users) {
        //             $scope.users = users;
        //         });
        // };
        //
        // $scope.add = function (user) {
        //     $http.post('/api/assignment/rest/user', user)
        //         .success(function (users) {
        //             $scope.users = users;
        //         });
        // };
        //
        // $scope.select = function (user) {
        //     $scope.user = angular.copy(user);
        // };
    }

})();