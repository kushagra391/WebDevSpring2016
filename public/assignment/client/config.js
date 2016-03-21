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
                    templateUrl: "views/home/home.view.html",
                    controller: 'HomeController'
                })
                // .when("/profile", {
                //     templateUrl: 'views/users/profile.view.html',
                //     controller: 'ProfileController'
                // })
                .when("/profile/:id", {
                    templateUrl: 'views/users/profile.view.html',
                    controller: 'ProfileController'
                })
                .when("/admin", {
                    templateUrl: 'views/admin/admin.view.html',
                    controller: 'AdminController'
                })
                .when("/form", {
                    templateUrl: 'views/forms/forms.view.html',
                    controller: "FormsController"
                })
                .when("/fields", {
                    templateUrl: 'views/forms/fields.view.html',
                    controller: "FieldsController"
                })
                .when("/register", {
                    templateUrl: 'views/users/register.view.html',
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: 'views/users/login.view.html',
                    controller: "LoginController"
                })
                .otherwise({
                    redirectTo: '/home'
                });
        });

})();