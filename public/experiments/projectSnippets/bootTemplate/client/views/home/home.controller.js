(function () {

    "use strict";

    angular
        .module("testApp")
        .controller("HomeController", HomeController);

    function HomeController() {

        var vm = this;

        console.log("hello from home controller");

    }

})();