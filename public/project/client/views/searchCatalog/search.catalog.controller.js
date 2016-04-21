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

            vm.courseTypes = ["Arts And Humanity", "Business", "Web Development", "Computer Science", "Data Science",
                "Life Science", "Mathematics", "Social Science"];

            vm.$location = $location;
            vm.searchKey = $routeParams.searchKey;

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

                        vm.message = buildMessage(vm.courses.length);

                        vm.resultsCount = vm.courses.length;

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

        function buildMessage(resultCount) {

            if (resultCount > 0) {
                var string = resultCount + " Results Found !";
            }

            else {
                var string = "Sorry, no courses found. Please retry for a different course, or browse the complete catalog.";
            }

            return string;

        }
    }

})();