module.exports = function (app, userModel) {

    "use strict";

    app.get('/api/mongodemo/user/all', findAllUsers);
    app.get('/api/mongodemo/user', findUsersByName);
    app.post('/api/mongodemo/user', addUser);
    app.get('/api/mongodemo/user/search', findUserByName);

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
    
    function findUsersByName(req, res) {
        
        var username = req.param('username');
        console.log('SERVER: ' + username);
        
        userModel.findUsersByName(username)
            .then(success, failure);
        
        function success(doc) {
            res.json(doc);
        }
        
        function failure(err) {
            res.status(400).send(err);
        }
        
        
    }

    function findUserByName(req, res) {

        var username = req.param('username');
        console.log('SERVER: ' + username);

        userModel.findUserByName(username)
            .then(success, failure);

        function success(doc) {
            res.json(doc);
        }

        function failure(err) {
            res.status(400).send(err);
        }


    }


};
