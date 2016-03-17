(function() {

    "use strict";

    angular
        .module('CourseraApp')
        .controller('CoursePageController', CoursePageController);

    function CoursePageController($scope, $routeParams, $sce, CourseService) {
        var courseid = $routeParams.id;
        console.log("CoursePageController: courseId: " + courseid);

        $scope.course = CourseService.getCourseFromId(courseid);

        $scope.courseName = CourseService.getCourseFromId(courseid).title;
        console.log("CoursePageController: courseName: " + $scope.courseName);

        $scope.getUrl = getUrl;

        function getUrl(videoId) {
            var url = "http://www.youtube.com/embed/" + videoId + "?autoplay=0";
            return $sce.trustAsResourceUrl(url);
        }

    }
})();