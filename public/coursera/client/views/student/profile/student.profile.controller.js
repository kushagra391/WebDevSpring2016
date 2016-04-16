(function () {

    angular
        .module('testApp')
        .controller('StudentProfileController', StudentProfileController);

    function StudentProfileController($routeParams, $location, StudentService) {
        var vm = this;

        console.log('hello from StudentProfileController');

        vm.currentStudent = StudentService.getCurrentUser();
        vm.courses = vm.currentStudent.courses_registerd;
        populateCourseURL();
        vm.$location = $location;
        vm.searchKey = ""; // init
        vm.searchCatalog = searchCatalog;

        function searchCatalog(searchKey) {
            console.log("Would search for :" + searchKey);
            $location.url('/searchCatalog/' + searchKey);
        }

        function populateCourseURL() {
            for (var i in vm.courses) {
                var course = vm.courses[i];
                course.url = "#/course/" + course._id;
            }
        }
    }

})();