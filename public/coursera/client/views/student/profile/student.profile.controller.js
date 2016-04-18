(function () {

    angular
        .module('testApp')
        .controller('StudentProfileController', StudentProfileController);

    function StudentProfileController($routeParams, $location, StudentService, CourseService) {
        var vm = this;

        function init() {
            console.log('hello from StudentProfileController');

            vm.courses = [];
            vm.$location = $location;
            vm.searchKey = ""; // init

            vm.searchCatalog = searchCatalog;
            vm.logout = logout;

            StudentService
                .getCurrentUser()
                .then(renderCurrentState);

        }

        init();


        function renderCurrentState(response) {
            vm.currentStudent = response.data;
            console.log("CurrentStudent: " + JSON.stringify(vm.currentStudent));

            populateStudentCourses();
            console.log("Courses: " + vm.courses);
        }

        function populateStudentCourses() {
            console.log("Populating Student Courses...");

            var courseIds = vm.currentStudent.courses_registerd;
            for (var i in courseIds) {
                var courseId = courseIds[i];
                CourseService
                    .findCourseById(courseId)
                    .then(
                        function (response) {
                            var course = response.data;
                            var courseUrl = "#/course/" + course._id;
                            course.url = courseUrl;

                            vm.courses.push(course);
                            console.log("Course pushed: " + JSON.stringify(course));
                        },
                        function (response) {
                            console.log("Course not found for ID: " + courseId);
                        }
                    );
            }
        }

        function logout() {
            // TODO: move to header
            console.log("Destroying Session, logout clicked !");

            StudentService
                .logout()
                .then(
                    function (response) {
                        console.log("Session Destroyed !");
                    },
                    function (err) {
                        console.log("Not destroyed");
                    }
                )
        }

        function searchCatalog(searchKey) {
            console.log("Would search for :" + searchKey);
            $location.url('/searchCatalog/' + searchKey);
        }
    }

})();