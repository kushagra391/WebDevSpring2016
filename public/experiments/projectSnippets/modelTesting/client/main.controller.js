(function () {

    "use strict";

    angular
        .module("testApp")
        .controller("MainController", MainController);

    function MainController($scope) {
        $scope.msg = "Hello from MainController !";
        console.log("hello from main controller");

    }

})();