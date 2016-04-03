(function () {

    angular
        .module('CourseraApp')
        .controller('RegisterController', RegisterController);


    function RegisterController($scope, $rootScope, $location, UserService) {

        $scope.register = register;


        function register(user) {
            // TODO: error handling

            // Activate user
            var newUser = UserService.registerUser($scope.user);
            UserService.setCurrentUser(newUser);
            $location.url('/studentprofile');

            console.log("RegisterController > register: Registration attempted");
        }


    }


})();