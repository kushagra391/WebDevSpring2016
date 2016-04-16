module.exports = function (db, mongoose) {

    "use strict";

    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    var api = {

        findUserByUsername: findUserByUsername,
        findUserByName: findUserByName,
        findAllUsers: findAllUsers,

        findUserByCredentials: findUserByCredentials,
        createUser: createUser,

        updateUserById: updateUserById,
        updateUserByName: updateUserByName,

        deleteUserById: deleteUserById,
        deleteUserByName: deleteUserByName,

        createCourseForUser : createCourseForUser

    };

    return api;

    function findUserByUsername(username) {
        return UserModel.find({username: username});
    }

    function findUserByName(name) {

        return UserModel.find({name: name});
    }

    function findAllUsers() {

        return UserModel.find();
    }

    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var passowrd = credentials.password;

        return UserModel.find({username: username, password: passowrd});
    }

    function createUser(user) {

        return UserModel.create(user);

    }

    function updateUserById() {

    }

    function updateUserByName() {

    }

    function deleteUserById() {

    }

    function deleteUserByName() {

    }
    
    
    // --------------------------------------- //

    // TODO: fix this part
    function createCourseForUser(user, course) {
        console.log("model: createCourseForUser >> saving to db");
        user.courses.push(course);
        console.log(user);

        return UserModel.save(user);

        // user.save(function (err, doc) {
        //     if (err) {
        //         return err;
        //     }
        //     else {
        //         return doc;
        //     }
        // });
        //
        //
        // UserModel.save(user, );
    }

};