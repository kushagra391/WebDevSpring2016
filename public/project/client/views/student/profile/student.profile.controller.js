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

            StudentService
                .getCurrentUser()
                .then(renderCurrentState);

        }

        init();

        /* ----------------------------------------------------------------------------------------- */

        function renderCurrentState(response) {
            vm.currentStudent = response.data;
            console.log("CurrentStudent: " + JSON.stringify(vm.currentStudent));

            populateStudentCourses();
            console.log("Courses: " + vm.courses);
        }

        function populateStudentCourses() {
            console.log("Populating Student Courses...");

            var studentId = vm.currentStudent._id;

            CourseService
                .findAllCoursesByStudentId(studentId)
                .then(
                    function (response) {
                        vm.courses = response.data;
                        for (var i in vm.courses) {
                            var course = vm.courses[i];
                            console.log("CourseID: " + course._id);
                            var courseUrl = "#/course/" + course._id;
                            course.url = courseUrl;
                        }
                    },
                    function (response) {
                        console.log("Courses not retrieved");
                    }
                );
        }

        function searchCatalog(searchKey) {
            console.log("Would search for :" + searchKey);
            $location.url('/searchCatalog/' + searchKey);
        }
    }

})();