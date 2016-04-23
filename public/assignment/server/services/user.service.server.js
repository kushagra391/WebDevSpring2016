var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require("mongoose");

module.exports = function (app, userModel) {

    "use strict";

    var auth = function (req, res, next) {

        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function isAdmin(user) {
        if (user.roles.indexOf("admin") > 0) {
            console.log(">> isAdmin");
            return true;
        }
        console.log(">> is NOT Admin");
        return false;
    }

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.post("/api/assignment/rest/user", auth, createUser);
    app.get("/api/assignment/loggedin", loggedin);
    app.get('/api/assignment/rest/user', auth, findAllUsers);
    app.put('/api/assignment/rest/user/:id', auth, updateUser);
    app.delete('/api/assignment/rest/user/:id', auth, deleteUser);

    app.get('/api/assignment/user/:id', findUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    console.log("Authentication: User credentials queried: " + JSON.stringify(user));
                    if (!user) {
                        console.log("Authentication: User NULL ");
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    console.log("Authentication: Error");
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {

        var user = req.user;

        console.log(">> login: successful for user: " + JSON.stringify(user));
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {

        console.log(">> register" + JSON.stringify(req.body));

        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        console.log("Duplicate User exists.. ");
                        res.json(null);
                    } else {
                        console.log("Creating new user.. ");
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        console.log("Trying for login.. ");
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {

        console.log(">> findAllUsers");
        console.log("Admin: " + JSON.stringify(req.user));
        if (isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        console.log(">> findAllUsers: Passed " + JSON.stringify(users));
                        res.json(users);
                    },
                    function (err) {
                        console.log(">> findAllUsers: Failed");
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if (isAdmin(req.user)) {

            userModel
                .removeUser(req.params.id)
                .then(
                    function (user) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if (!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if (typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function (user) {
                    return findAllUsers();
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if (newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    // if the user does not already exist
                    if (user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function () {
                                    return userModel.findAllUsers();
                                },
                                function (err) {
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );

        //UserModel.findOne({username: req.body.username}, function(err, user)
        //{
        //    if(user == null)
        //    {
        //        user = new UserModel(newUser);
        //        user.save(function(err, user)
        //        {
        //            UserModel.find(function(err, users)
        //            {
        //                res.json(users);
        //            });
        //        });
        //    }
        //    else
        //    {
        //        UserModel.find(function(err, users)
        //        {
        //            res.json(users);
        //        });
        //    }
        //});
    }

    ///////////////////////////////////////////////////////

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
    }

};