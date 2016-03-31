module.exports = function (app) {

    "use strict";

    app.get('/api/demo/user', findUserByParam);
    app.get('/api/demo/user/all', getAllUsers);
    app.get('/api/demo/user/:id', findUserById);

    // post
    app.get('/api/demo/user/:userId', updateUser);

    // delete
    app.delete('/api/demo/user/:userId', deleteUserById);


   function updateUser(req, res) {
       // TODO
   }

    function deleteUserById(req, res) {
        // TODO
    }

    function findUserById(req, res) {
        var username = req.params.id;
        res.send(username);
    }

    function getAllUsers(req, res) {
        console.log('Get all users');
        res.send('returning all users');
    }

    function findUserByParam(req, res) {
        console.log('Finding user by param');
        var username = req.param('username');

        res.send('details sought for: ' + username);
    }

};