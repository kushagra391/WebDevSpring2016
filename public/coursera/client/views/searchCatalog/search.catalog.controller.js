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
            vm.searchKey = $routeParams.searchKey;

            vm.addCourse = addCourse;
            vm.redirectToCourse = redirectToCourse;
            vm.searchCatalogResults = searchCatalogResults;

            searchCatalogResults();
        }

        init();

        function searchCatalogResults() {
            var searchkey = vm.searchKey;

            CourseService
                .searchCourseByQueryString(searchkey)
                .then(
                    function (response) {

                        vm.courses = response.data;
                        console.log(JSON.stringify(vm.courses));

                        $location.url("/searchCatalog/" + searchkey);

                    },
                    function (response) {
                        console.log("FATAL: " + response.data);
                    }
                );
        }

        function redirectToCourse(index) {
            var course = vm.courses[index];
            console.log("Redirecting to: " + course.name);
            $location.url("/course/" + course._id);
        }

        function addCourse() {
            console.log("Adding course to student");

        }

    }

})();