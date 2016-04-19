module.exports = function (app, studentModel, developerModel, courseModel) {

    "use strict";

    app.get("/api/coursera/course/:courseId/video/all", findAllVideosByCourseId);
    app.get("/api/coursera/course/:courseId/video/:videoId", findVideoByIdAndCourseId);

    function findAllVideosByCourseId(req, res) {

        var courseId = req.params.courseId;

        courseModel
            .findCourseById(courseId)
            .then(
                function (course) {
                    res.json(course.videos);
                },
                function (err) {
                    res.json(err);
                }
            );

    }

    // TODO: move this out to a separate content directory
    function findVideoByIdAndCourseId(req, res) {

        var courseId = req.params.courseId;
        var videoId = req.params.videoId;

        courseModel
            .findCourseById(courseId)
            .then(
                function (course) {
                    var videos = course.videos;
                    for (var i in videos) {
                        var video = videos[i];

                        if (video._id == videoId) {
                            res.json(video);
                        }
                    }

                    console.log(">> Video not Found <<");

                },
                function (err) {
                    res.json(err);
                }
            );

    }

};