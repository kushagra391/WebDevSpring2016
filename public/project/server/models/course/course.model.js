module.exports = function (mongoose) {

    "use strict";

    var CourseSchema = require('./course.schema')(mongoose);
    var CourseModel = mongoose.model('Course', CourseSchema);

    var api = {
        createNewCourse: createNewCourse,
        findAllCourses: findAllCourses,
        findAllCoursesByIDs: findAllCoursesByIDs,
        findCourseById: findCourseById,
        addVideoToCourse: addVideoToCourse,
        removeVideoFromCourse: removeVideoFromCourse,
        deleteCourse: deleteCourse,
        deleteAllCourses : deleteAllCourses

    };
    return api;

    function deleteAllCourses() {
        return CourseModel.remove();
    }

    function createNewCourse(newCourse) {
        return CourseModel.create(newCourse);
    }

    function findAllCoursesByIDs(courseIdsArray) {
        return CourseModel
            .find({
                "_id": {
                    $in: courseIdsArray.map(function (o) { return o; })
                }
            });
    }

    function findAllCourses(courseIds) {
        return CourseModel.find();
    }

    function findCourseById(courseId) {
        return CourseModel.findById(courseId);
    }

    function addVideoToCourse(course, newVideo) {
        var videos = course.videos;

        videos.push(newVideo);

        return course.save();
    }

    function removeVideoFromCourse(course, contentId) {

        var videos = course.videos;

        for (var i in videos) {
            var content = videos[i];
            if (content._id == contentId) {
                videos.splice(i, 1);
            }
        }

        return course.save();
    }

    function deleteCourse(course) {
        return course.remove();
    }
};