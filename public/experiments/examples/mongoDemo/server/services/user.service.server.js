module.exports = function (app, userModel) {

    "use strict";

    app.get('/api/mongodemo/user/all', findAllUsers);
    app.post('/api/mongodemo/user', addUser);

    function testConnection(req, res) {
        res.json('successfully connected');
    }

    function addUser(req, res) {
        var newUser = req.body;
        res.json(userModel.addUser(newUser));
    }


    function findAllUsers(req, res) {
        
        var users = userModel.findAllUsers();
        res.json(users);
        
    }


};
