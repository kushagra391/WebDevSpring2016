

module.exports = function (db, mongoose) {

    "use strict";

    var mockForm = require('./user.model.mock.json');
    var UserSchema = require('./user.schema.server')(mongoose);

    var api = {
        findAllUsers : findAllUsers,
        addUser : addUser
    };

    return api;

    function findAllUsers() {
        return mockForm;
    }
    
    function addUser(newUser) {
        mockForm.push(newUser);
        
        return mockForm;
    }

}