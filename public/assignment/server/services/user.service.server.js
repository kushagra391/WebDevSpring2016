module.exports = function (app, userModel) {

    "use strict";

    app.get('/api/assignment/user/all', findAllUsers);                          // OK
    app.get("/api/assignment/user", findUser);                                  // OK ?username
    app.get('/api/assignment/user/:id', findUserById);                          // OK
    app.post("/api/assignment/user", createUser);                               // OK
    app.post('/api/assignment/user/login', findUserByCredentials);              // OK
    app.put('/api/assignment/user/:id', updateUser);                            // OK
    app.delete('/api/assignment/user/:id', deleteUser);                         // Check, successful but still showing

    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    function findUser(req, res) {

        var username = req.param('username');

        console.log('findUser: Username from client: ' + username);
        if (!username) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            userModel
                .findUserByUsername(username)
                .then(
                    function (user) {
                        res.json(user);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }

        // console.log('listening for /api/assignment/user');
        //
        // var username = req.param('username');
        // if (username) {
        //     console.log('username already exists');
        //     var user = userModel.findUserByUsername(username);
        //     res.json(user);
        // } else {
        //     console.log('username does not exists');
        //     var users = userModel.findAllUsers();
        //     res.json(users);
        // }
    }

    function findAllUsers(req, res) {

        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // var users = userModel.findAllUsers();
        // console.log("SERVER SERVICE: " + JSON.stringify(users));
        // res.json(users);
    }

    function createUser(req, res) {
        console.log("in: createUser()");

        var user = req.body;

        userModel.createUser(user)
            .then(
                function (user) {
                    console.log("in: createUser() --> user" + JSON.stringify(user));
                    // req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    console.log("in: createUser() --> err");
                    res.status(400).send(err);
                }
            );
        // var user = req.body;        // TODO: revisit
        // var users = userModel.createUser(user);
        //
        // res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // var userId = req.params.id;
        // var user = userModel.findUserById(userId);
        // res.json(user);
    }

    function findUserByCredentials(req, res) {

        var credentials = req.body;

        console.log("findUserByCredentials(): " + JSON.stringify(credentials));

        userModel
            .findUserByCredentials(credentials)
            .then(
                function (user) {
                    // req.session.currentUser = user;
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // console.log('Trying to find user by credentials');
        //
        // var credentials = req.body;
        // console.log(JSON.stringify(credentials));
        // var user = userModel.findUserByCredentials(credentials);
        // res.json(user);
    }

    function updateUser(req, res) {

        var userId = req.params.id;
        var user = req.body;

        console.log("SERVER: client's userId: " + userId + " AND username: " + user.username);

        userModel
            .updateUser(userId, user)
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // var userId = req.params.id;
        // var user = req.body;
        // var users = userModel.updateUser(userId, user);
        // res.json(users);
    }

    function deleteUser(req, res) {

        var userId = req.param.id;

        userModel
            .deleteUser(userId)
            .then(
                function (users) {
                    console.log('deleteUser(): User deleted');
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        // var userId = req.param.id;
        // var users = userModel.deleteUser(userId);
        // res.json(users);
    }

    // Methods for session / cookies
    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    // Methods for session / cookies
    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};