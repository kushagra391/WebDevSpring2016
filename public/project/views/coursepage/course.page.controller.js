(function() {

    "use strict";

    angular
        .module('CourseraApp')
        .controller('CoursePageController', CoursePageController);

    function CoursePageController($scope, $routeParams, CourseService) {
        var courseid = $routeParams.param;
        $scope.courseName = CourseService.getCourseFromId(courseid).title;
        console.log("CoursePageController: courseId: " + courseid);
        console.log("CoursePageController: courseName: " + $scope.courseName);
    }
})();