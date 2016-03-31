(function () {

    "use strict";

    angular
        .module('sortableApp', ['jgaTable'])
        .controller('MainController', MainController);

    function MainController($scope) {

        $scope.users = getUsers();
        function getUsers() {
            var users = [
                {
                    "name" : "Kushagra",
                    "age" : 27,
                    "gender" : "Male"
                },
                {
                    "name" : "Amrit",
                    "age" : 28,
                    "gender" : "Male"
                },
                {
                    "name" : "Bhatta",
                    "age" : 27,
                    "gender" : "Male"
                },
                {
                    "name" : "Shruti",
                    "age" : 27,
                    "gender" : "Female"
                }
            ];

            return users;
        }
        

        // $scope.users = [
        //     {
        //         "name" : "Kushagra",
        //         "age" : 27,
        //         "gender" : "Male"
        //     },
        //     {
        //         "name" : "Amrit",
        //         "age" : 28,
        //         "gender" : "Male"
        //     },
        //     {
        //         "name" : "Bhatta",
        //         "age" : 27,
        //         "gender" : "Male"
        //     },
        //     {
        //         "name" : "Shruti",
        //         "age" : 27,
        //         "gender" : "Female"
        //     }
        // ];
    }

})();