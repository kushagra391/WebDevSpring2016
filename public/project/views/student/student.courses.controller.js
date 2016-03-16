(function () {

    angular
        .module('CourseraApp')
        .controller('StudentCourseController', StudentCourseController);

    function StudentCourseController($scope, $location, UserService, CourseService) {

        var current_user = UserService.getCurrentUser();
        console.log("StudentCourseController: " + current_user.firstName);

        $scope.courses = [];
        var registered_courses = current_user.registered_course_ids;
        for (var courseIndex in registered_courses) {

            var courseId = registered_courses[courseIndex];

            console.log("CourseId: " + courseId);
            console.log("CourseName: " + CourseService.getCourseFromId(courseId).title);
            console.log("CourseDesc: " + CourseService.getCourseFromId(courseId).description);

            var course = {
                    "title": CourseService.getCourseFromId(courseId).title,
                    "description": CourseService.getCourseFromId(courseId).description
                };

            $scope.courses.push(course);
        }
    }


})();