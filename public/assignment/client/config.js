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
                controller: "FormsController",
                controllerAs: 'model'
            })
            .when('/form/:formId/fields', {
                templateUrl: 'views/forms/fields.view.html',
                controller: "FieldsController",
                controllerAs: 'model'
            })
            .when("/fields", {
                templateUrl: 'views/forms/fields.view.html',
                controller: "FieldsController",
                controllerAs: 'model'
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

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();