(function () {

    "use strict";

    angular
        .module('mongoApp')
        .controller('SearchController', SearchController);

    function SearchController(UserService) {
        var vm = this;


        vm.users = [];
        vm.search = search;


        function search(username) {

            console.log("Searching for: " + username);

            UserService.findUsersByName(username)
                .then(success, failure);

            function success(response) {
                console.log(JSON.stringify(response));
                vm.users = response.data;
            }
        }

        function failure(reponse) {
            console.log("ERROR: " + response);
        }

    }


})();