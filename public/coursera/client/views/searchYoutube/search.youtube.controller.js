(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('SearchYoutubeController', SearchYoutubeController);

    function SearchYoutubeController($routeParams) {
        var vm = this;
        console.log('Hello from SearchYoutubeController');
        console.log('Searching for :' + $routeParams.searchKey);
        
        vm.searchKey = $routeParams.searchKey;
        
    }


})();