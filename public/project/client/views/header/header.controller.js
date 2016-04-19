(function () {
    
    "use strict";
    
    angular 
        .module('testApp')
        .controller("HeaderController", HeaderController);
    
    function HeaderController($location) {
        
        var vm = this;
        console.log(">> HomeController");

        function init() {
            vm.$location = $location;

            vm.searchKey = "";
            vm.searchCatalog = searchCatalog;
        }
        init();
        
        function searchCatalog() {
            console.log("Redirecting to searchcatalog with : " + vm.searchKey);
            $location.url('/searchCatalog/' + vm.searchKey);
        }
        
        
    }
    
    
})();