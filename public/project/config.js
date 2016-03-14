/**
 * Created by Kushagra on 3/12/2016.
 */

(function () {

    "use strict";
    angular
        .module("CourseraApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: 'HomeController'
                })
                //.when("/profile", {
                //    templateUrl: 'views/users/profile.view.html',
                //    controller: 'ProfileController'
                //})
                //.when("/admin", {
                //    templateUrl: 'views/admin/admin.view.html',
                //    controller: 'AdminController'
                //})
                //.when("/form", {
                //    templateUrl: 'views/forms/forms.view.html',
                //    controller: "FormsController"
                //})
                //.when("/fields", {
                //    templateUrl: 'views/forms/fields.view.html',
                //    controller: "FieldsController"
                //})
                .when("/register", {
                    templateUrl: 'views/register/register.view.html',
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: 'views/login/login.view.html'
                    //controller: ""
                })
                .otherwise({
                    redirectTo: '/home'
                });
        });

})();