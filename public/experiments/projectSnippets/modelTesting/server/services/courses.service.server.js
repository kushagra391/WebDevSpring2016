module.exports = function (app, userModel) {

    "use strict";

    app.get("", findAllCoursesByUserId);
    app.get("", findAllCoursesByUserName);
    app.get("", findCourseByCourseIdForUserId);
    app.get("", findCourseByCourseIdForUserName);

    app.post("", createCourseForUser);

    function findAllCoursesByUserId(req, res) {
        console.log(">> findAllCoursesByUserId");

    }

    function findAllCoursesByUserName(req, res) {
        console.log(">> findAllCoursesByUserName");

    }

    function findCourseByCourseIdForUserId(req, res) {
        console.log(">> findCourseByCourseIdForUserId");

    }

    function findCourseByCourseIdForUserName(req, res) {
        console.log(">> findCourseByCourseIdForUserName");

    }

    function createCourseForUser(req, res) {
        console.log(">> createCourseForUser");

    }

// function (req, res) {
//
// }
//
// function (req, res) {
//
// }
//
// function (req, res) {
//
// }

};