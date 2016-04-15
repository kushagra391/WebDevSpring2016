(function () {

    "use strict";

    angular
        .module('testApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();

