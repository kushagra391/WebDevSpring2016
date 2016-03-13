(function () {

    angular
        .module('CourseraApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $http) {
        $scope.searchKey = "";
        $scope.search = search;

        function search(keyword) {
            console.log("User pressed: " + keyword);

            var api_key = "AIzaSyDvX6gB6-SABxToMYfQGCFk7SSCvh9bHeg";
            var url_prefix = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
            var url_suffix = "&key=" + api_key;

            var url = url_prefix + keyword + url_suffix;
            $http.get(url)
                .success(render);
        }

        function render(respose) {
            console.log(respose);
        }
    }


})();