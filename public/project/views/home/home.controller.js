(function() {

    angular
        .module('CourseraApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $location) {
        $scope.hello = "Hello from HomeController";
    }

})();