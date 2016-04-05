(function () {

    "use strict";

    angular
        .module('mongoApp')
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: 'model'
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
})();