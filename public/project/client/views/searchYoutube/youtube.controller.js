(function () {

    angular
        .module('testApp')
        .controller('YoutubeController', YoutubeController);

    function YoutubeController($location) {
        var vm = this;

        function init() {

            vm.searchKey = "";
            vm.searchYoutubeResults = searchYoutubeResults;

        }
        init();

        function searchYoutubeResults(searchKey) {
            $location.url("/searchYoutube/" + vm.searchKey);
        }


    }


})();