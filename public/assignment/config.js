/**
 * Created by Kushagra on 2/23/2016.
 */
(function () {

    "use strict";
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/profile", {
                    templateUrl: 'views/users/profile.view.html',
                    controller: 'ProfileController'
                })
                .when("/admin", {
                    templateUrl: 'views/admin/admin.view.html'
                    //controller: ""
                })
                .when("/form", {
                    templateUrl: 'views/forms/forms.view.html'
                    //controller: ""
                })
                .when("/field", {
                    templateUrl: 'views/forms/forms.view.html'
                    //controller: ""
                })
                .when("/register", {
                    templateUrl: 'views/users/register.view.html'
                    //controller: ""
                })
                .when("/login", {
                    templateUrl: 'views/users/login.view.html'
                    //controller: ""
                })
                .otherwise({
                    redirectTo: '/home'
                });
        });

})();