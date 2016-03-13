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
                    "description": "Lectures from Stanford University on Data Mining Techniques. " +
                    "Algorithm techniques range from Clustering, Classification and Prediction",
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
                    "description": "Lectures from Northeastern University on Web Development Frameworks " +
                    "Course covers applications from MEAN Stack focussing equally well on frontend, backend and security",
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
        }
    }

})();