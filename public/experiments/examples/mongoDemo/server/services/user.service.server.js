module.exports = function (app, userModel) {

    "use strict";

    app.get('/api/mongodemo/user/all', findAllUsers);
    app.post('/api/mongodemo/user', addUser);

    function testConnection(req, res) {
        res.json('successfully connected');
    }

    function addUser(req, res) {
        var user = req.body;
        // res.json(userModel.addUser(newUser));

        // handle model promises
        user = userModel.addUser(user)
            .then(
                function (doc) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findAllUsers(req, res) {

        var users = userModel.findAllUsers();
        // res.json(users);
        
        users = userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


};
