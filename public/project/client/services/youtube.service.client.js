(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('YoutubeAPIService', YoutubeAPIService);

    function YoutubeAPIService($http) {

        var api = {
            getYoutubeQueryResults: getYoutubeQueryResults
        };

        return api;

        function getYoutubeQueryResults(searchUrl) {
            return $http.get(searchUrl);
        }

    }

})();