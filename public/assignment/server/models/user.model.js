var q = require('q');

module.exports = function (db, mongoose) {

    "use strict";

    var UserSchema = require('./user.scehma.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        removeUser: removeUser,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        return UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            }
        );
    }

    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findAllUsers() {
        return UserModel.find();
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function removeUser(userId) {
        return UserModel.remove({_id: userId});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, {$set: user});
    }

};



