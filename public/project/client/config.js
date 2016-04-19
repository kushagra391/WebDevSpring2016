(function () {

    "use strict";

    angular
        .module('testApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/developerRegister", {
                templateUrl: "views/developer/register/developer.register.view.html",
                controller: "DeveloperRegisterController",
                controllerAs: "model"
            })
            .when("/developerLogin", {
                templateUrl: "views/developer/login/developer.login.view.html",
                controller: "DeveloperLoginController",
                controllerAs: "model"
            })
            .when("/developerProfile/:profileId", {
                templateUrl: "views/developer/profile/developer.profile.view.html",
                controller: "DeveloperProfileController",
                controllerAs: "model"
            })
            .when("/studentRegister", {
                templateUrl: "views/student/register/student.register.view.html",
                controller: "StudentRegisterController",
                controllerAs: "model"
            })
            .when("/studentLogin", {
                templateUrl: "views/student/login/student.login.view.html",
                controller: "StudentLoginController",
                controllerAs: "model"
            })
            .when("/studentProfile/:profileId", {
                templateUrl: "views/student/profile/student.profile.view.html",
                controller: "StudentProfileController",
                controllerAs: "model"
            })
            .when("/searchCatalog/:searchKey", {
                templateUrl: "views/searchCatalog/search.catalog.view.html",
                controller: "SearchCatalogController",
                controllerAs: "model"
            })
            .when("/searchYoutube/:searchKey", {
                templateUrl: "views/searchYoutube/search.youtube.view.html",
                controller: "SearchYoutubeController",
                controllerAs: "model"
            })
            .when("/course/:courseId", {
                templateUrl: "views/course/coursePage/course.view.html",
                controller: "CourseController",
                controllerAs: "model"
            })
            .when("/course/:courseId/content/:contentIndex", {
                templateUrl: "views/course/contentPage/content.view.html",
                controller: "ContentController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

})();

