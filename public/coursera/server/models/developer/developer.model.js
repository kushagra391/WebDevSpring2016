module.exports = function (mongoose) {

    "use strict";

    var DeveloperSchema = require('./developer.schema.server')(mongoose);
    var DeveloperModel = mongoose.model('Developer', DeveloperSchema);

    var api = {
        findAllDevelopers : findAllDevelopers,
        createDeveloper: createDeveloper,
        findUserByCredentials: findUserByCredentials

    };
    return api;

    function findAllDevelopers() {
        return DeveloperModel.find();
    }

    function createDeveloper(newDeveloper) {
        return DeveloperModel.create(newDeveloper);
    }


    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;

        return DeveloperModel.find({username: username, password: password});
    }

};