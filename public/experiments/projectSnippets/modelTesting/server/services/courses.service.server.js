module.exports = function (app, userModel) {

    "use strict";

    // app.get("", findAllCoursesByUserId);
    // app.get("", findAllCoursesByUserName);
    // app.get("", findCourseByCourseIdForUserId);
    // app.get("", findCourseByCourseIdForUserName);

    app.post("/api/test/user/:name/course", createCourseForUser);

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

        var name = req.params.name;
        var course = req.body;

        userModel
            .findUserByName(name)
            .then(
                function (user) {

                    console.log("user located: " + user);
                    if (user) {

                        userModel
                            .createCourseForUser(user, course)
                            .then(
                                function (user) {
                                    console.log("course added");
                                    res.json(user);
                                },
                                function (err) {
                                    console.log("course not added");
                                    res.json(err);
                                }
                            );
                    }
                    else {
                        res.json(404);
                    }

                },
                function (err) {
                    res.json(err);
                }
            );

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