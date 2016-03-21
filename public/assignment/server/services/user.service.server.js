module.exports = function (app, userModel, db) {

    "use strict";

    var userPath = '/api/assignment/user';
    var userIdPath = '/api/assignment/user/:id';
    var userLoginPath = '/api/assignment/user/:login';

    app.post(userPath, createUser);
    app.get(userPath, findUser);
    app.get(userIdPath, findUserById);
    app.get(userLoginPath, findUserByCredentials);
    app.put(userIdPath, updateUser);
    app.delete(userIdPath, deleteUser);

    function createUser(req, res) {
        
    }

    function findUser(req, res) {

    }

    function findUserById(req, res) {

    }

    function findUserByCredentials(req, res) {

    }

    function updateUser(req, res) {

    }

    function deleteUser(req, res) {

    }
};