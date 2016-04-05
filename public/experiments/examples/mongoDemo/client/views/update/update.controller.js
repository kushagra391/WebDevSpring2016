(function () {

    "use strict";

    angular
        .module('mongoApp')
        .controller('UpdateController', UpdateController);

    function UpdateController(UserService) {

        var vm = this;

        vm.msg = null;

        vm.update = update;
        vm.user = {};
        vm.id = null;

        vm.submit = submit;


        function update(username) {
            UserService.findUserByName(username)
                .then(success, failure);

            function success(response) {

                console.log('update: successful-1 --> ' + JSON.stringify(response));

                var user = response.data;

                vm.user.name = user.name;
                vm.user.username = user.username;
                vm.user.password = user.password;

                vm.id = user._id;
                // vm.user = user;
            }
        }

        function submit(user) {
            
            console.log('Trying to update userID: ' + vm.id + "to... :" + JSON.stringify(user));
            
            UserService.updateUser(user, vm.id)
                .then(success, failure);

            function success(response) {
                vm.msg = "Successfully Upadted User ! ";
            }

        }
        

        function failure(response) {
            console.log("ERROR: " + response)
        }


    }


})();
