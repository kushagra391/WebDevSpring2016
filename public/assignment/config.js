/**
 * Created by Kushagra on 2/23/2016.
 */
(function () {

    "use-strict";
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: ""
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: ""
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: ""
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: ""
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: ""
                })
                .when("/form", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: ""
                })
                .otherwise({
                    redirectTo: "views/home/home.view.html"
                });
        });

})();