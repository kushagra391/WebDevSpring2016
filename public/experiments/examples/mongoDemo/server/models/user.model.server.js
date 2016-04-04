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
        addUser: addUser
    };

    return api;

    function findAllUsers() {
        return mockForm;
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

}