/**
 * Created by Kushagra on 3/12/2016.
 */

(function () {
    angular
        .module("CourseraApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }

})();