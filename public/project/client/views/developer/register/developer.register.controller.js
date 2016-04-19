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