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
            .when("/update", {
                templateUrl: "views/update/update.view.html",
                controller: "UpdateController",
                controllerAs: 'model'
            })
            .when("/modal", {
                templateUrl: "views/modals/modal.view.html",
                controller: "ModalController",
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
})();