var q = require('q');

module.exports = function (db, mongoose) {

    "use strict";

    var UserSchema = require('./user.scehma.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {

        var deferred = q.defer();

        UserModel.create(user, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
        // var newUser = {
        //     _id: uuid.v4(),
        //     username: user.username,
        //     password: user.password,
        //     email: user.email
        // };
        // mockUsers.push(newUser);
        // return mockUsers;
    }

    function findAllUsers() {

        var deferred = q.defer();

        UserModel.find(function (err, users) {
            if (!err) {
                deferred.resolve(users);
            } else {
                deferred.reject(err);
            }
        })

        return deferred.promise;
        // console.log('SERVER: Inside findAllUsers');
        // return mockUsers;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {
            if (!err) {
                deferred.resolve(user);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
        // for (var index in mockUsers) {
        //     if (mockUsers[index]._id === userId) {
        //         return mockUsers[index];
        //     }
        // }
        //
        // return null;
    }

    function updateUser(userId, newUser) {

        var deferred = q.defer();

        UserModel
            .update({_id: userId}, {$set: newUser},
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                });

        return deferred.promise;
        // for (var index in mockUsers) {
        //     if (mockUsers[index]._id === userId) {
        //         mockUsers[index].firstName = newUser.firstName;
        //         mockUsers[index].lastName = newUser.lastName;
        //         mockUsers[index].username = newUser.username;
        //         mockUsers[index].password = newUser.password;
        //         mockUsers[index].email = newUser.email;
        //     }
        // }
        //
        // return mockUsers;
    }

    function deleteUser(userId) {

        var deferred = q.defer();

        UserModel
            .remove({_id: userId}, function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
        // for (var index in mockUsers) {
        //     if (mockUsers[index]._id === userId) {
        //         mockUsers.splice(index, 1);
        //     }
        // }
        //
        // return mockUsers;
    }

    function findUserByUsername(username) {

        var deferred = q.defer();

        UserModel
            .findOne({username: username},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                });

        return deferred.promise;

        // for (var index in mockUsers) {
        //     if (mockUsers[index].username === username) {
        //         return mockUsers[index];
        //     }
        // }
        //
        // return null;
    }

    function findUserByCredentials(credentials) {

        var deferred = q.defer();

        UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            },
            function (err, user) {
                if (!err) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(err);
                }
            });

        return deferred.promise;
        // for (var index in mockUsers) {
        //     if (mockUsers[index].username === credentials.username
        //         && mockUsers[index].password === credentials.password) {
        //         return mockUsers[index];
        //     }
        // }
        //
        // return null;
    }
};



