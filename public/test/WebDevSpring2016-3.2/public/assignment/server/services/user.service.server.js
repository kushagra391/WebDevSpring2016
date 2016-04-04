module.exports = function (app, userModel, db) {

    "use strict";

    var userPath = '/api/assignment/user';
    var userIdPath = '/api/assignment/user/:id';
    // var userLoginPath = '/api/assignment/user/:login';
    var userLoginPath = '/api/assignment/user/login';

    app.post(userPath, createUser);
    app.get(userPath, findUser);
    app.get(userIdPath, findUserById);
    app.post(userLoginPath, findUserByCredentials);
    app.put(userIdPath, updateUser);
    app.delete(userIdPath, deleteUser);

    function findUser(req, res) {
        console.log('listening for /api/assignment/user');

        var username = req.param('username');
        if (username) {
            console.log('username already exists');
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else {
            console.log('username does not exists');
            var users = userModel.findAllUsers();
            res.json(users);
        }
    }

    function createUser(req, res) {
        var user = req.body;        // TODO: revisit
        var users = userModel.createUser(user);

        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByCredentials(req, res) {

        console.log('Trying to find user by credentials');

        var credentials = req.body;
        console.log(JSON.stringify(credentials));
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        var users = userModel.updateUser(userId, user);
        res.json(users);
    }

    function deleteUser(req, res) {
        var userId = req.param.id;
        var users = userModel.deleteUser(userId);
        res.json(users);
    }
};