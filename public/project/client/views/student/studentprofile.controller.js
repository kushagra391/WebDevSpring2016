(function() {

    angular
        .module('CourseraApp')
        .controller('StudentProfileController', StudentProfileController);

    function StudentProfileController($scope, UserService) {
        console.log("Hello from StudentProfileController");

        var currentUser = UserService.getCurrentUser();
        console.log(currentUser);
        $scope.user = currentUser.firstName;

        console.log("StudentProfileController: currentUser: " + $scope.user);


    }

})();