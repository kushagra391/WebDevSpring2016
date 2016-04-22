(function () {
    
    "use strict";
    
    angular 
        .module('testApp')
        .controller('DeveloperRegisterController', DeveloperRegisterController);
    
    function DeveloperRegisterController($location, DeveloperService) {
        
        var vm = this;
        
        function init() {

            vm.$location = $location;
            vm.registerDeveloper = registerDeveloper;
            
            
        }
        
        init();
        
        function registerDeveloper(newDeveloper) {
            console.log(newDeveloper);

            vm.register_error = null;
            if (newDeveloper == null) {
                vm.register_error = "Please fill in the required fields";
                console.log('details not filled yet');
                return;
            }
            if (!newDeveloper.username) {
                vm.register_error = "Please provide a username";
                console.log('username not provided');
                return;
            }
            if (!newDeveloper.password || !newDeveloper.verifypassword) {
                vm.register_error = "Please provide a password";
                console.log('password field not filled');
                return;
            }
            if (newDeveloper.password != newDeveloper.verifypassword) {
                vm.register_error = "Passwords must match";
                console.log('passwords dont match');
                return;
            }


            DeveloperService
                .createDeveloper(newDeveloper)
                .then(registerSuccess, registerFailure);

            function registerSuccess(response) {
                console.log("Registration Success !");
                var developer = response.data;

                DeveloperService.setCurrentUser(developer);

                console.log("Routing to profile page.");
                $location.url("/developerProfile/" + developer._id);
            }

            function registerFailure(response) {
                console.log(response);
            }

        }
        
        
        
        
    }
    
    
})();