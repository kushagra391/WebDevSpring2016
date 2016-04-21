(function () {

    "use strict";

    angular
        .module('testApp')
        .controller('CourseController', CourseController);

    function CourseController($routeParams, $location, StudentService, DeveloperService, CourseService, LikeService) {
        var vm = this;

        function init() {
            console.log("Hello from CourseController: " + $routeParams.courseId);

            vm.$location = $location;

            CourseService
                .findCourseById($routeParams.courseId)
                .then(renderCourse);

            DeveloperService
                .getCurrentUser()
                .then(
                    function (response) {
                        if (response.data !== "") {
                            vm.developer = response.data;
                            vm.isDeveloperLoggedIn = true;
                        }
                        else {
                            vm.isStudentLoggedIn = false;
                        }
                    }
                );

            StudentService
                .getCurrentUser()
                .then(
                    function (response) {
                        console.log("Response: " + JSON.stringify(response));
                        if (response.data !== "") {
                            console.log("STUDENTLOGIN: Student logged in");
                            vm.student = response.data;
                            vm.isStudentLoggedIn = true;


                            var courseId = $routeParams.courseId;
                            LikeService
                                .findLikesForCourseId(courseId)
                                .then(
                                    function (response) {
                                        var likes = response.data;
                                        ifStudentLikesCourseHelper(vm.student._id, likes);
                                    }
                                );

                            CourseService
                                .findAllCoursesByStudentId(vm.student._id)
                                .then(
                                    function (response) {
                                        var courses = response.data;
                                        ifStudentHasTakenCourseHelper(vm.student._id, courses);
                                    }
                                )

                        }
                        else {
                            console.log("STUDENTLOGIN: Student NOT logged in");
                            vm.isStudentLoggedIn = false;
                        }
                    }
                );

            vm.likeCourse = likeCourse;
            vm.unlikeCourse = unlikeCourse;
            vm.addCourse = addCourse;
            vm.removeCourse = removeCourse;

            vm.deleteCourse = deleteCourse;
            vm.redirectToContent = redirectToContent;
            vm.redirectToYoutube = redirectToYoutube;

            vm.getContentUrl = getContentUrl;

            vm.studentLogin = studentLogin;
            vm.ifStudentLikedCourse = ifStudentLikedCourse;
            vm.ifStudentHasCourse = ifStudentHasCourse;
            vm.developerLogin = developerLogin;

            // vm.ifStudentLikedCourse = ifStudentLikedCourse;

        }

        init();

        function ifStudentHasCourse() {
            return vm.isStudentHasCourse;
        }


        /* ================================== */

        function ifStudentLikesCourseHelper(studentId, likes) {

            for (var i in likes) {

                var like = likes[i];

                if (like.studentId == studentId) {
                    vm.isStudentLikes =  true;
                    return;
                }
            }

            vm.isStudentLikes =  false;
        }

        function ifStudentHasTakenCourseHelper(studentId, courses) {

            for (var i in courses) {
                var course = courses[i];

                if (course.id == $routeParams.courseId) {
                    console.log("Student HAS Course");
                    vm.isStudentHasCourse = true;
                    return;
                }
            }

            vm.isStudentHasCourse = false;
        }

        function developerLogin() {
            return vm.isDeveloperLoggedIn;
        }

        function studentLogin() {
            return vm.isStudentLoggedIn;
        }

        function ifStudentLikedCourse() {

            return vm.isStudentLikes;
        }

        function unlikeCourse() {
            var courseId = $routeParams.courseId;
            var currentStudent = vm.student;

            // student logged in
            if (currentStudent != null) {
                var studentId = currentStudent._id;
                // console.log('studentID: ' + studentId);

                LikeService
                    .removeLikeForStudentAndCourse(courseId, studentId)
                    .then(
                        function (response) {
                            vm.isStudentLikes = false;
                            console.log("UNLIKE: successful");
                        },
                        function (response) {
                            console.log("UNLIKE: unsuccesful");
                        }
                    );
            }
        }

        function likeCourse() {
            var courseId = $routeParams.courseId;
            var currentStudent = vm.student;

            console.log("studentId: " + currentStudent);
            console.log(typeof studentId == 'undefined');

            // student logged in
            if (typeof vm.student != 'undefined') {
                var studentId = currentStudent._id;
                console.log('studentID: ' + studentId);

                var newLike = {
                    studentId: studentId,
                    courseId: courseId
                };

                LikeService
                    .addLikeForStudentAndCourse(newLike)
                    .then(
                        function (response) {
                            vm.isStudentLikes = true;
                            console.log("LIKESCHEMA: User Like Successful");
                        },
                        function (response) {
                            console.log("LIKESCHEMA: User Like Failed");
                        }
                    );
            }
            else {
                console.log('studentID is UNDEFINED');
            }
        }

        function redirectToYoutube() {
            $location.url("/searchYoutube");
        }

        function getContentUrl(videoIndex) {
            // console.log(">> Inside getContentUrl");

            var courseId = $routeParams.courseId;
            var videos = vm.course.videos;
            var video = videos[videoIndex];
            // console.log("Content clicked: " + JSON.stringify(video));
            var url = "#/course/" + courseId + "/content/" + video._id;
            // console.log(url);
            return url;
        }

        // TODO: only the course owner can delete a course
        function deleteCourse() {

            var courseId = $routeParams.courseId;
            var developerId = vm.developer._id;

            CourseService
                .deleteCourseById(developerId, courseId)
                .then(
                    function (response) {
                        console.log("Course Deleted Succesfully");
                    },
                    function (response) {
                        console.log("ERROR");
                    }
                );

        }

        function renderCourse(response) {
            vm.course = response.data;

            vm.name = vm.course.name;
            vm.description = vm.course.description;
            vm.likes = vm.course.likes;
            vm.videos = vm.course.videos;
            // console.log(JSON.stringify(vm.course));
        }

        function redirectToContent(videoIndex) {
            var contentUrl = "/course/" + vm.course._id + "/content/" + videoIndex;
            // console.log("Redirecting to url: " + contentUrl);
            // $location.url(contentUrl);
            console.log(">> Redirecting.. ");
            $location.url('/developerLogin');
        }

        function addCourse() {
            var courseId = $routeParams.courseId;

            StudentService
                .getCurrentUser()
                .then(
                    function (response) {
                        var studentId = response.data;

                        StudentService
                            .addCourseToStudent(studentId, courseId)
                            .then(
                                function (response) {
                                    // TODO: Notify, remove the add button

                                    var user = response.data;
                                    vm.isStudentHasCourse = true;
                                    console.log('Course successfully added');
                                },
                                function (response) {
                                    console.log('FATAL-2: Course successfully NOT added');
                                }
                            );
                    },
                    function (response) {
                        console.log('FATAL-1: Course successfully NOT added');
                    }
                );
        }

        function removeCourse() {

            var courseId = $routeParams.courseId;

            StudentService
                .getCurrentUser()
                .then(
                    function (response) {
                        var studentId = response.data;

                        StudentService
                            .removeCourseFromStudent(studentId, courseId)
                            .then(
                                function (response) {
                                    // TODO: Notify, remove the add button
                                    vm.isStudentHasCourse = false;
                                    console.log('Course successfully removed');
                                },
                                function (response) {
                                    console.log('FATAL-2: Course successfully NOT removed');
                                }
                            );
                    },
                    function (response) {
                        console.log('FATAL-1: Course successfully NOT removed');
                    }
                );
        }



    }



})();