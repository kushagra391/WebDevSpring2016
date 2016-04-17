module.exports = function (app, studentModel, developerModel) {

    "use strict";

    app.get('/api/coursera/developer/all', findAllDevelopers);
    app.post("/api/coursera/developer", createDeveloper);
    app.post("/api/coursera/developer/login", findUserByCredentials);


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

};