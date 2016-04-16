(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('SearchCatalogController', SearchCatalogController);

    function SearchCatalogController($routeParams) {
        var vm = this;
        console.log("hello from SearchCatalogController");
        console.log("searchKey:" + $routeParams.searchKey);

        // search and display entries / init controller
        vm.searchKey = $routeParams.searchKey;
    }

})();