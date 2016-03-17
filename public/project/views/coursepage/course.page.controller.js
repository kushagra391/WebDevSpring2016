(function() {

    "use strict";

    angular
        .module('CourseraApp')
        .controller('CoursePageController', CoursePageController);

    function CoursePageController($scope, $routeParams, CourseService) {
        var courseid = $routeParams.id;
        console.log("CoursePageController: courseId: " + courseid);
        $scope.courseName = CourseService.getCourseFromId(courseid).title;
        console.log("CoursePageController: courseName: " + $scope.courseName);
    }
})();