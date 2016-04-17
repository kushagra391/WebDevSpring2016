module.exports = function (app, studentModel, developerModel) {

    "use strict";

    app.get('/api/coursera/developer/all', findAllDevelopers);                                          // OK
    app.get('/api/coursera/developer/:developerId', findDeveloperById);
    app.post("/api/coursera/developer", createDeveloper);                                               // OK
    app.post("/api/coursera/developer/login", findUserByCredentials);                                   // OK

    app.post("/api/coursera/developer/:developerId/course", addCourseForDeveloper);                     // OK
    app.delete("/api/coursera/developer/:developerId/course/:courseId", removeCourseByIdForDeveloper);  // OK


    function findDeveloperById(req, res) {
        var developerId = req.params.developerId;

        developerModel
            .findDeveloperById(developerId)
            .then(
                function (developer) {
                    res.json(developer);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findAllDevelopers(req, res) {
        developerModel
            .findAllDevelopers()
            .then(
                function (developers) {
                    res.json(developers);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function createDeveloper(req, res) {
        console.log(">> createDeveloper");

        var newDeveloper = req.body;
        developerModel
            .createDeveloper(newDeveloper)
            .then(
                function (developer) {
                    res.json(developer);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        console.log(">> findUserByCredentials");

        var credentials = req.body;
        developerModel
            .findUserByCredentials(credentials)
            .then(
                function (developer) {
                    res.json(developer);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function addCourseForDeveloper(req, res) {
        console.log(">> addCourseForDeveloper");

        var developerId = req.params.developerId;
        var newCourse = req.body;

        console.log("   > DeveloperID: " + developerId);
        console.log("   > newCourse: " + JSON.stringify(newCourse));

        developerModel
            .findDeveloperById(developerId)
            .then(
                function (developer) {
                    console.log("Developer Found: " + JSON.stringify(developer));

                    developerModel
                        .addCourseForDeveloper(developer, newCourse)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.json(err);
                            }
                        );
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function removeCourseByIdForDeveloper(req, res) {

        var developerId = req.params.developerId;
        var courseId = req.params.courseId;

        developerModel
            .findDeveloperById(developerId)
            .then(
                function (developer) {

                    developerModel
                        .removeCourseForDeveloper(developer, courseId)
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.json(err);
                            }
                        );

                },
                function (err) {
                    res.json(err);
                }
            )

    }

};