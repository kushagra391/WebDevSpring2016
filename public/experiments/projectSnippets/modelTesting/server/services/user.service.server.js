module.exports = function (app, userModel) {

    "use strict";

    app.get("/api/test/user/:username", findUserByUsername);
    app.get("/api/test/user/:name", findUserByName);
    app.get("/api/test/user/all", findAllUsers);

    app.post("/api/test/user/login", findUserByCredentials);
    app.post("/api/test/user", createUser);

    app.put("/api/test/user/:id", updateUserById);
    app.put("/api/test/user/:name", updateUserByName);

    app.delete("/api/test/user/:id", deleteUserById);
    app.delete("/api/test/user/:name", deleteUserByName);


    function findUserByUsername() {

    }

    function findUserByName() {

    }

    function findAllUsers() {

    }

    function findUserByCredentials() {

    }

    function createUser() {

    }

    function updateUserById() {

    }

    function deleteUserById() {

    }

    function deleteUserByName() {

    }

};
