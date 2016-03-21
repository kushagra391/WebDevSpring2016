var mockUsers = require('./user.mock.json');
var uuid = require('node-uuid');

module.exports = function (app) {
    
    "user strict";
    
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
        
    }
    
    function findAllUser() {
        
    }
    
    function findUserById(userId) {
        
    }
    
    function updateUser(userId, newUser) {
        
    }
    
    function deleteUser(userId) {
        
    }
    
    function findUserByUsername(username) {
        
    }
    
    function findUserByCredentials(credential) {
        
    }
}



