var q = require('q');

module.exports = function (db, mongoose) {

    "use strict";

    var mockForm = require('./user.model.mock.json');

    // load user schema
    var UserSchema = require('./user.schema.server')(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);


    var api = {
        findAllUsers: findAllUsers,
        addUser: addUser,
        findUsersByName: findUsersByName,
        findUserByName: findUserByName
    };

    return api;

    function findAllUsers() {
        // return mockForm;

        var deferred = q.defer();

        UserModel.find(function (err, doc) {
            if (err) {
                console.log('ERROR');
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function addUser(user) {

        var deferred = q.defer();

        // insert new user with mongoose user model's create
        UserModel.create(user, function (err, doc) {

            if (err) {
                deferred.reject(err);
                console.log('Error Ocurred');
            }
            else {
                deferred.resolve(doc);
                console.log(doc);
            }
        });

        return deferred.promise;
    }

    function findUsersByName(username) {

        var deferred = q.defer();

        var searchJSON = {
            "username": username
        };

        UserModel.find(searchJSON, function (err, doc) {

            if (err) {
                deferred.reject(err);
                console.log('Error Ocurred');
            }
            else {
                deferred.resolve(doc);
                console.log(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByName(username) {

        var deferred = q.defer();

        var searchJSON = {
            "username": username
        };

        UserModel.findOne(searchJSON, function (err, doc) {

            if (err) {
                deferred.reject(err);
                console.log('Error Ocurred');
            }
            else {
                deferred.resolve(doc);
                console.log(doc);
            }
        });

        return deferred.promise;
    }

};