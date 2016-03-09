(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location) {
        $scope.$location = $location;
    }

    function isAdmin() {
        return currentUser.roles.indexOf('admin') == -1;
    }

})();