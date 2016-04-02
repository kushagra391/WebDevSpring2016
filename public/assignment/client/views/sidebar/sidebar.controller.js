(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location, UserService) {
        $scope.$location = $location;

        $scope.redirectToProfile = redirectToProfile;

        function redirectToProfile() {
            $location.url('/profile' + '/' + UserService.getCurrentUser()._id);
        }

    }

    function isAdmin() {
        return currentUser.roles.indexOf('admin') == -1;
    }

})();