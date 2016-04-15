(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($location) {
        var vm = this;

        vm.register = register;
        
        function register(user) {
            
        }
    }


})();