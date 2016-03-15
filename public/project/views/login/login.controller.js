(function() {

    angular
        .module('CourseraApp')
        .controller('LoginController', LoginController);

    function LoginController($scope, $location, UserService) {

        $scope.error = "";
        $scope.login = login;


        function login(user) {
            console.log("trying to login: " + user.username + " / " + user.password);

            var userResult = UserService.getUserFromCredentials(user.username, user.password);

            // verify credentials
            if (userResult == null) {
                // print message and return
                $scope.error = "Wrong username / password. Please retry";
                return;
            }

            // set user session
            UserService.setCurrentUser(userResult);

            // set url
            $location.url('/studentprofile');
        }
    }

})();