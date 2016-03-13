(function() {

    angular
        .module('CourseraApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $location) {
        $scope.hello = "Hello from HomeController";
        $scope.searchKey = "";

        console.log("user entered" + $scope.searchKey);
        console.log('Inside HomeController');
    }

})();