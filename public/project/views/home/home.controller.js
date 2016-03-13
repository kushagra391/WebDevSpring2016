(function () {

    angular
        .module('CourseraApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $location) {
        $scope.searchKey = "";
        $scope.search = search;

        function search(keyword) {
            console.log("User pressed: " + keyword);
        }
    }


})();