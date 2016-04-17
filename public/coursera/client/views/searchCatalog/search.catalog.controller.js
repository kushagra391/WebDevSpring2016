(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('SearchCatalogController', SearchCatalogController);

    function SearchCatalogController($routeParams, $location, CourseService) {
        var vm = this;

        function init() {
            console.log("hello from SearchCatalogController");
            console.log("searchKey:" + $routeParams.searchKey);

            vm.$location = $location;

            // search and display entries / init controller
            vm.searchKey = $routeParams.searchKey;
            vm.searchCatalogResults = searchCatalogResults;
            searchCatalogResults();

            vm.redirectToCourse = redirectToCourse;
        }

        init();

        function searchCatalogResults() {

            var searchkey = vm.searchKey;

            vm.courses = CourseService.searchCourseByQueryString(searchkey);

        }

        function redirectToCourse(index) {
            var course = vm.courses[index];
            console.log("Redirecting to: " + course.name);
            $location.url("/course/" + course._id);
        }

    }

})();