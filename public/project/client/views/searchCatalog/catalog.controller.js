(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('CatalogController', CatalogController);

    function CatalogController($location) {

        var vm = this;

        function init() {

            vm.$location = $location;
            vm.searchKey = "";

            vm.courseTypes = ["Arts And Humanity", "Business", "Web Development", "Computer Science", "Data Science",
                "Life Science", "Mathematics", "Social Science"];

            vm.searchCourseType = searchCourseType;
        }
        init();

        function redirectToSearchCatalog(searchKey) {

            $location.url('/searchCatalog/' + searchKey);

        }

        function searchCourseType(index) {

            console.log(vm.courseTypes[index] + " searched << ");

            $location.url('/searchCatalog/' + vm.courseTypes[index]);

        }
    }



})();