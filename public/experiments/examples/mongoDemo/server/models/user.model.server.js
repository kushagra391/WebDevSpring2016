

module.exports = function (db, mongoose) {

    "use strict";

    var mockForm = require('./user.model.mock.json');

    // load user schema
    var UserSchema = require('./user.schema.server')(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

    
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