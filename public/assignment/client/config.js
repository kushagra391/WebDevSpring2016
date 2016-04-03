/**
 * Created by Kushagra on 2/23/2016.
 */
(function () {

    "use strict";
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: 'HomeController'
            })
            .when("/profile", {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when("/profile/:id", {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when("/admin", {
                templateUrl: 'views/admin/admin.view.html',
                controller: 'AdminController',
                controllerAs: 'model'
            })
            .when("/form", {
                templateUrl: 'views/forms/forms.view.html',
                controller: "FormsController"
            })
            .when('/form/:formId/fields', {
                templateUrl: 'views/forms/fields.view.html',
                controller: "FieldsController"
            })
            .when("/fields", {
                templateUrl: 'views/forms/fields.view.html',
                controller: "FieldsController"
            })
            .when("/register", {
                templateUrl: 'views/users/register.view.html',
                controller: "RegisterController",
                controllerAs: 'model'
            })
            .when("/login", {
                templateUrl: 'views/users/login.view.html',
                controller: "LoginController",
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }


    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                if (currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

})();