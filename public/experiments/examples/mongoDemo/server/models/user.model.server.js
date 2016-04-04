
var mockForm = require('./user.model.mock.json');

module.exports = function (db, mongoose) {

    "use strict";

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