module.exports = function (app, studentModel, developerModel) {

    "use strict";
    app.get("/api/coursera/course/all", findAllCourses);
    app.get("/api/coursera/course/:courseId", findCourseById);
    app.get("/api/coursera/course/:searchString", searchCourseByQueryString);
    app.post("/api/coursera/developer/:developerId/course/:courseId", addVideoToCourse);


    function findAllCourses(req, res) {
        console.log(">> findAllCourses");


    }

    function findCourseById(req, res) {
        console.log(">> findCourseById");

        var courseId = req.params.courseId;

    }

    function searchCourseByQueryString(req, res) {
        console.log(">> searchCourseByQueryString");

        var searchString = req.params.searchString;
    }

    function addVideoToCourse(req, res) {
        console.log(">> addVideoToCourse");

        var developerId = req.params.developerId;
        var courseId = req.params.courseId;
        var newVideo = req.body;

    }

};