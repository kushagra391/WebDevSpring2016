(function () {

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, UserService) {

        var vm = this;

        function init() {
            vm.$location = $location;
            vm.redirectToProfile = redirectToProfile;
        }

        init();

        function redirectToProfile() {
            console.log("redirecting to profile");
            $location.url('/profile' + '/' + UserService.getCurrentUser()._id);
        }

    }

    function isAdmin() {
        return currentUser.roles.indexOf('admin') == -1;
    }

})();