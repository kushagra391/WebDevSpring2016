(function () {

    "use strict";

    angular
        .module('App')
        .controller('MainController', MainController)
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }]);

    function MainController($scope, $http) {
        // $scope.courses = [
        //     {title: 'Java 101', seats: 12, start: new Date()},
        //     {title: 'C# 101', seats: 12, start: new Date()},
        //     {title: 'ASP.NET 101', seats: 12, start: new Date()},
        //     {title: 'Node.js 101', seats: 12, start: new Date()},
        //     {title: 'AngularJS 101', seats: 12, start: new Date()}
        // ];
        //
        // console.log($scope.courses);

        // $http.get("/api/json")
        $http.get("/api/json")
            .success(function (response) {
                console.log("ajax call succesfull");
                $scope.courses = response;
            });

        console.log($scope.courses);
    }

})();