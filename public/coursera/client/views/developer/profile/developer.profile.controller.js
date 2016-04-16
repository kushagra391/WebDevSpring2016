(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('DeveloperProfileController', DeveloperProfileController);

    function DeveloperProfileController($routeParams, $location, DeveloperService) {
        var vm = this;
        console.log("UserID: " + $routeParams.profileId);

        vm.courses = DeveloperService.getCurrentUser().courses_created;
        console.log(vm.courses);

        vm.$location = $location;
        vm.searchKey = "";
        vm.searchYoutube = searchYoutube;

        function searchYoutube(searchKey) {
            console.log("Would search for :" + searchKey);
            $location.url('/searchYoutube/' + searchKey);
        }

    }

})();