var mockUsers = require('./user.mock.json');
// var uuid = require('node-uuid');

module.exports = function (app) {

    "use strict";

    var api = {
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {

        var newUser = {
            _id: uuid.v4(),
            username: user.username,
            password: user.password,
            email: user.email
        };
        mockUsers.push(newUser);
        return mockUsers;
    }

    function findAllUser() {
        return mockUsers;
    }

    function findUserById(userId) {
        for (var index in mockUsers) {
            if (mockUsers[index]._id === userId) {
                return mockUsers[index];
            }
        }

        return null;
    }

    function updateUser(userId, newUser) {
        for (var index in mockUsers) {
            if (mockUsers[index]._id === userId) {
                mockUsers[index].firstName = newUser.firstName;
                mockUsers[index].lastName = newUser.lastName;
                mockUsers[index].username = newUser.username;
                mockUsers[index].password = newUser.password;
                mockUsers[index].email = newUser.email;
            }
        }

        return mockUsers;
    }

    function deleteUser(userId) {
        for (var index in mockUsers) {
            if (mockUsers[index]._id === userId) {
                mockUsers.splice(index, 1);
            }
        }

        return mockUsers;
    }

    function findUserByUsername(username) {
        for (var index in mockUsers) {
            if (mockUsers[index].username === username) {
                return mockUsers[index];
            }
        }

        return null;
    }

    function findUserByCredentials(credentials) {

        for (var index in mockUsers) {
            if (mockUsers[index].username === credentials.username
                && mockUsers[index].password === credentials.password) {
                return mockUsers[index];
            }
        }

        return null;
    }
}



