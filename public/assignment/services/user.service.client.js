(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .service("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {
                    "_id": 123,
                    "firstName": "Alice",
                    "lastName": "Wonderland",
                    "username": "alice",
                    "password": "alice",
                    "roles": ["student"]
                },
                {
                    "_id": 234,
                    "firstName": "Bob",
                    "lastName": "Hope",
                    "username": "bob",
                    "password": "bob",
                    "roles": ["admin"]
                },
                {
                    "_id": 345,
                    "firstName": "Charlie",
                    "lastName": "Brown",
                    "username": "charlie",
                    "password": "charlie",
                    "roles": ["faculty"]
                },
                {
                    "_id": 456,
                    "firstName": "Dan",
                    "lastName": "Craig",
                    "username": "dan",
                    "password": "dan",
                    "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567,
                    "firstName": "Edward",
                    "lastName": "Norton",
                    "username": "ed",
                    "password": "ed",
                    "roles": ["student"]
                }
            ],
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,

            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            findUserByUsername: findUserByUsername
        };

        return model;

        // TODO: resolve callbacks
        function findUserByCredentials(username, password, callback) {
            for (var uindex in model.users) {
                if (model.users[uindex].username === username) {
                    return model.users[uindex];
                }
            }
            return null;
        }

        function findAllUsers(callback) {
            return model.users;
        }

        function createUser(user, callback) {
            var user = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password,
                email: user.email
            };
            model.users.push(user);
            return user;
        }

        function deleteUserById(userid, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users.splice(u, 1);
                }
            }
        }

        // TODO: usage of callbacks, return values
        function updateUser(userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u].username = user.username;
                    model.users[u].firstName = user.firstName;
                    model.users[u].lastName = user.lastName;
                    model.users[u].password = user.password;

                    return model.users[u];
                }
            }
            return null;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function findUserByUsername(username) {
            for (var index in model.users) {
                if (model.users[index].username === username) {
                    return model.users[index];
                }
            }

            return null;
        }
    }
})();
