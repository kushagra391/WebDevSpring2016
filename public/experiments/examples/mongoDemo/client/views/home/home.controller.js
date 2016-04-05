(function () {

    "use strict";

    angular
        .module('mongoApp')
        .controller('HomeController', HomeController);

    function HomeController(UserService) {
        var vm = this;

        vm.msg = "Hello From MainController";
        vm.users = [];
        vm.submit = submit;
        vm.refresh = refresh;

        function init() {
            UserService.findAllUsers()
                .then(success, failure);

            function success(response) {
                vm.users = response.data;
            }

        }

        init();

        function submit(submittedUser) {
            vm.user = null;

            if (submittedUser == null)
                return;


            // push submittedUser to server
            UserService.addUser(submittedUser)
                .then(displaySuccessLog, failure);

            function displaySuccessLog(response) {
                console.log('user inserted successfully');
            }


            // vm.users.push(submittedUser);
            console.log('User details: ' + JSON.stringify(submittedUser));
            // console.log(JSON.stringify(vm.users));
        }

        function refresh() {
            UserService.findAllUsers()
                .then(refreshUserTable, failure);

            function refreshUserTable(response) {
                vm.users = response.data;
            }
        }


        function failure(response) {
            console.log(response);
        }


    }


})();