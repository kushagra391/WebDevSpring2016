(function() {

    angular
        .module('CourseraApp')
        .controller('StudentProfileController', StudentProfileController);

    function StudentProfileController() {
        console.log("Hello from StudentProfileController");
    }

})();