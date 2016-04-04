module.exports = function (app) {
    
    var userModel = require('./models/user.model.server')(app);
    
    var userService = require('./services/user.service.server')(app, userModel); 
    
};