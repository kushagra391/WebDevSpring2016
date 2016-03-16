(function () {

    angular
        .module('CourseraApp')
        .factory('CourseService', CourseService);

    function CourseService($rootScope) {
        var model = {
            courses: [
                {
                    "_id": 1,
                    "title": "Data Mining Techniques",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta sollicitudin turpis, ac accumsan diam rhoncus ut. Praesent vitae leo sed orci convallis fringilla. Pellentesque iaculis pulvinar auctor. Donec sed tincidunt felis. Fusce mollis posuere volutpat. Cras tincidunt quam aliquet erat convallis vulputate. In sed urna ac lacus porta auctor in nec diam. Fusce at felis nec felis condimentum fermentum. Proin id eleifend magna, et dignissim nunc. Donec aliquam tortor sit amet eleifend pulvinar. Suspendisse suscipit turpis in condimentum lacinia. Quisque ante est, malesuada quis nunc et, tincidunt lobortis erat. Duis egestas diam a condimentum pulvinar. Sed et lorem non leo efficitur finibus nec ut turpis",
                    "syllabus": "",
                    "videos": [{
                        "video_id": "",
                        "video_url": ""
                    }, {
                        "video_id": "",
                        "video_url": ""
                    }, {
                        "video_id": "",
                        "video_url": ""
                    }]
                },
                {
                    "_id": 2,
                    "title": "Web Development",
                    "description": "Curabitur pulvinar rhoncus mauris nec viverra. Suspendisse potenti. Vivamus consequat erat et feugiat venenatis. Maecenas faucibus nisi sed erat lobortis varius. Sed laoreet leo a lacus mattis sagittis. Vestibulum accumsan sapien sed nulla consequat tempor. Nullam vitae ante non nibh condimentum aliquet sed eu lorem. Nullam sed tortor id tellus molestie semper nec nec ex. Duis velit turpis, venenatis pharetra lacus non, euismod rutrum nisi. Nulla lacinia, odio vitae bibendum vestibulum, mauris lectus vehicula elit, in vehicula purus arcu eget orci. Aenean eu nunc quis ipsum ornare viverra. Aliquam erat volutpat. Praesent mattis imperdiet lorem, in iaculis felis vehicula in. Etiam eleifend nec nulla id auctor.",
                    "syllabus": "",
                    "videos": [{
                        "video_id": "",
                        "video_url": "",
                        "video_thumbnail_url": ""
                    }, {
                        "video_id": "",
                        "video_url": "",
                        "video_thumbnail_url": ""
                    }, {
                        "video_id": "",
                        "video_url": "",
                        "video_thumbnail_url": ""
                    }]
                }
            ],

            // getter methods, used by students (and developers)
            getCourseFromId: getCourseFromId,
            getVideoListFromId: getVideoListFromId,
            getSyllabusFromId: getSyllabusFromId,
            getDescriptionFromId: getDescriptionFromId,

            // setter method, used exclusively by developers
            editCourseTitle: editCourseTitle,
            editCourseDescription: editCourseDescription,
            editCourseSyllabus: editCourseSyllabus,
            addVideoToCourse: addVideoToCourse,
            removeVideoFromCourse: removeVideoFromCourse
        };

        return model;


        function getCourseFromId(courseId) {
            for (var index in model.courses) {
                var course = model.courses[index];
                if (courseId == course._id) {
                    return course;
                }
            }

            console.log("getCourseFromId: course not found");
        }

        function getVideoListFromId(courseId) {
            var course = getCourseFromId(courseId);
            return course.videos;
        }

        function getSyllabusFromId(courseId) {
            var course = getCourseFromId(courseId);
            return course.syllabus;
        }

        function getDescriptionFromId(courseId) {
            var course = getCourseFromId(courseId);
            return course.description;
        }

        function editCourseTitle(courseId) {
            return getCourseFromId(courseId).title;
        }

        function editCourseDescription(courseId, description) {
            getCourseFromId(courseId).description = description;
        }

        function editCourseSyllabus(courseId, syllabus) {
            getCourseFromId(courseId).syllabus = syllabus;
        }

        // video = id + url + thumbnail
        function addVideoToCourse(courseId, video) {
            var course = getCourseFromId(courseId);
            course.videos.push(video);
        }

        function removeVideoFromCourse(courseId, video) {
            var course = getCourseFromId(courseId);
            var videoIndex = course.videos.indexOf(video);
            course.videos.splice(videoIndex, 1);
        }
    }
})();