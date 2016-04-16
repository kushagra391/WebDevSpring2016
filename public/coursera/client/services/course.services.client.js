(function () {

    "use strict";

    angular
        .module('testApp')
        .factory('CourseService', CourseService);

    function CourseService() {

        var model = {
            courses: [
                {
                    "_id": "1",
                    "name": "Maths",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "likes": 2,
                    "videos": ["v1", "v2", "v3", "v4", "v5", "v6"]
                },
                {
                    "_id": "2",
                    "name": "Physics",
                    "description": "Ut sit amet vulputate mauris. Cras sed sodales mi. Pellentesque laoreet diam at augue aliquam facilisis. Cras et diam ut sapien facilisis scelerisque. Fusce a porta risus. Donec nec arcu gravida, blandit justo et, dictum est. Suspendisse lacinia egestas leo.",
                    "likes": 1,
                    "videos": ["v1", "v2", "v3", "v4", "v5", "v6"]
                },
                {
                    "_id": "3",
                    "name": "Chemistry",
                    "description": "Aenean ut pellentesque purus. Integer nec ex hendrerit, laoreet felis a, fermentum nisi. Aliquam erat volutpat. Duis bibendum, erat vel varius dignissim, lacus magna scelerisque urna, a egestas sem odio non nulla. Suspendisse ultrices pulvinar nibh. Etiam vehicula tincidunt imperdiet. Etiam sit amet bibendum orci. Sed convallis urna aliquet, molestie odio a, volutpat augue. Cras sollicitudin vitae purus sed accumsan. Integer id augue lobortis mi ullamcorper cursus. Duis et consectetur tellus. Nam ut accumsan neque, non pretium nibh. Cras a consectetur odio, a rhoncus sem. Duis egestas urna eu feugiat lacinia.",
                    "likes": 2,
                    "videos": ["v1", "v2", "v3", "v4", "v5", "v6"]
                },
                {
                    "_id": "4",
                    "name": "Computer Science",
                    "description": "Fusce tincidunt lacus at laoreet laoreet. Nulla mollis sed ex blandit egestas. Suspendisse vel consequat metus. Nunc condimentum euismod velit et eleifend. Nulla leo arcu, lobortis vitae enim non, convallis dignissim turpis. Nullam malesuada auctor mauris, vel blandit arcu. Sed placerat est vel ante commodo, nec ornare tortor mollis. Morbi facilisis nibh eget quam semper, eget feugiat felis sodales. Aenean libero ligula, vehicula non ornare eget, viverra sed metus. Etiam elementum turpis neque, vitae pulvinar lacus elementum ut.",
                    "likes": 3,
                    "videos": ["v1", "v2", "v3", "v4", "v5", "v6"]
                }
            ],

            findCourseById : findCourseById
        };
        
        return model;

        function findCourseById(courseId) {
            for (var i in model.courses) {
                if (model.courses[i]._id == courseId) {
                    console.log("Ids found for : " + courseId);
                    return model.courses[i];
                }
            }

            console.log("No Ids found for : " + courseId);
            return null;
        }


    }

})();