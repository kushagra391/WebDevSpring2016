module.exports = function (app, userModel) {

    "use strict";

    app.get("/api/test/user/username/:username", findUserByUsername);
    app.get("/api/test/user/name/:name", findUserByName);
    app.get("/api/test/user/all", findAllUsers);

    app.post("/api/test/user/login", findUserByCredentials);
    app.post("/api/test/user", createUser);

    app.put("/api/test/user/:id", updateUserById);
    app.put("/api/test/user/:name", updateUserByName);

    app.delete("/api/test/user/:id", deleteUserById);
    app.delete("/api/test/user/:name", deleteUserByName);

    function findUserByUsername(req, res) {
        console.log(">> findUserByUsername");

        var username = req.params.username;
        userModel
            .findUserByName(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );

        res.json(200);

    }

    function findUserByName(req, res) {
        console.log(">> findUserByName");

        var name = req.params.name;

        userModel
            .findUserByName(name)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function findAllUsers(req, res) {
        console.log(">> findAllUsers");

        userModel
            .findAllUsers()
            .then(success, failure);

        function success(doc) {
            res.json(doc);
        }

        function failure(err) {
            res.json(err)
        }
    }

    function findUserByCredentials(req, res) {
        console.log(">> findUserByCredentials");
        var credentials = req.body;


        userModel
            .findUserByCredentials(credentials)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.json(err);
                }
            );
    }

    function createUser(req, res) {
        console.log(">> createUser");

        var user = req.body;
        console.log(user);

        userModel
            .createUser(user)
            .then(success, failure);

        function success(doc) {
            res.json(doc);
        }

        function failure(err) {
            res.json(err);
        }

    }

    function updateUserById(req, res) {
        console.log(">> updateUserById");

        res.json(200);
    }

    function updateUserByName(req, res) {
        console.log(">> updateUserByName");

        res.json(200);
    }

    function deleteUserById(req, res) {
        console.log(">> deleteUserById");
        res.json(200);
    }

    function deleteUserByName(req, res) {
        console.log(">> deleteUserByName");

        res.json(200);
    }

};
