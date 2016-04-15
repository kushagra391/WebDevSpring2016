

module.exports = function (app, db, mongoose) {
    var userModel = require('./models/user.model.server')(db, mongoose);
    var userService = require('./services/user.service.server')(app, userModel);
};